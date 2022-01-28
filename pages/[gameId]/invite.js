import QRCode from "qrcode.react";
import {useRouter} from "next/router";
import clientPromise from "../../lib/mongodb";
import {Alert, Button, Col, Container, Row} from "react-bootstrap";
import Participants from "../../components/Participants";

export default function Invite({success, apiHost}) {
    const router = useRouter();
    const {gameId} = router.query;

    let protocol = "";
    if (typeof window !== 'undefined')
        protocol = window.location.protocol;
    let hostname = window.location.host;

    const nextUrlBeginning = protocol + "//" + hostname + "/" + gameId;

    return <Container fluid className="invite">
        <Row>
            {!success && (
                <Alert variant="warning">
                    Fehler beim Eintragen in die Datenbank ¯\_(ツ)_/¯
                </Alert>
            )}
            <Col className="qr-container">
                <QRCode value={nextUrlBeginning + "/join"} size={1024} className="qr"/>
                <p>{nextUrlBeginning + "/join"}</p>
                <Button onClick={() => router.push(nextUrlBeginning + "/game")}>Spiel starten</Button>
            </Col>
            <Col>
                <Participants gameId={gameId} apiHost={apiHost}/>
            </Col>
        </Row>
    </Container>
}

export async function getServerSideProps(context) {
    let success = false;
    try {
        const client = await clientPromise;
        const db = client.db("main");
        const games = db.collection("games");

        const newGame = {
            _id: context.params.gameId,
            centerAccount: context.query[1],
            bankAccount: context.query[0],
            players: [],
            started: false,
        }
        try {
            await games.insertOne(newGame);
        } catch (e) {
            console.log("ignored duplicate key");
        }

        success = true;
    } catch (e) {
        console.error(e);
    }

    if (!process.env.API_HOST) {
        throw new Error('Please add your host to .env.local');
    }

    return {
        props: {
            success: success,
            apiHost: process.env.API_HOST,
        }
    }
}