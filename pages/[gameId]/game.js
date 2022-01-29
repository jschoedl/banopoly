import clientPromise from "../../lib/mongodb";
import {Alert, Col, Container, Row} from "react-bootstrap";
import Account from "../../components/Account";
import Controls from "../../components/Controls";

export default function ViewGame({success, game, clientId, clientSecret, refreshToken}) {
    let playerColumns = [];
    if (success) {
        game.players.forEach(player => playerColumns.push(<Col key={player.name}><Account name={player.name}
                                                                                          address={player.address}/></Col>))
    }

    return <>
        {!success && (
            <Alert variant="warning">
                Fehler beim Eintragen in die Datenbank ¯\_(ツ)_/¯
            </Alert>
        )}
        <Container fluid className="game">
            <Row>
                <Col><Account name="Bank" address={game.bankAccount}/></Col>
                <Col><Controls clientId={clientId} clientSecret={clientSecret} refreshToken={refreshToken}/></Col>
                <Col><Account name="Mitte" address={game.centerAccount}/></Col>
            </Row>
            <Row>
                {playerColumns}
            </Row>
        </Container>
    </>
}

export async function getServerSideProps(context) {
    let success = false;
    let game = {};
    try {
        const client = await clientPromise;
        const db = client.db("main");
        const games = db.collection("games");

        game = await games.findOne({_id: context.params.gameId})
        success = true;
        games.updateOne({_id: context.params.gameId}, {$set: {started: true}});
    } catch (e) {
        console.error(e);
    }

    return {
        props: {
            success: success,
            game: game,
            clientId: process.env.CLIENT_ID,
            clientSecret: process.env.CLIENT_SECRET,
            refreshToken: process.env.REFRESH_TOKEN,
        }
    }
}