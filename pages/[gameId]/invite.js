import QRCode from "qrcode.react";
import {useRouter} from "next/router";
import clientPromise from "../../lib/mongodb";
import {Alert} from "react-bootstrap";


export default function Invite({success}) {
    const router = useRouter();
    const {gameId} = router.query;

    let hostname = "";
    if (typeof window !== 'undefined')
        hostname = window.location.host;

    const joinURL = hostname + "/" + gameId + "/join";

    return <>
        {!success && (
            <Alert variant="warning">
                Fehler beim Eintragen in die Datenbank ¯\_(ツ)_/¯
            </Alert>
        )}

        <QRCode value={joinURL}/>
        <p>{joinURL}</p>
    </>
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
        }
        await games.insertOne(newGame);
        success = true;
    } catch (e) {
        console.error(e);
    }

    return {
        props: {
            success: success,
        }
    }
}