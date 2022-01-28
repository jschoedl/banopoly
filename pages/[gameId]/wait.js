import clientPromise from "../../lib/mongodb";
import {Alert} from "react-bootstrap";
import funFacts from "../../public/funFacts";
import {endings, sentences} from "../../public/waitingMessages";
import {end} from "stream-http/lib/request";

export default function Home({success, funFact, waitingMessage}) {
    return (
        <div>
            {success && (
                <h1>{waitingMessage}</h1>
            )}
            {!success && (
                <Alert variant="warning">
                    Fehler beim Eintragen in die Datenbank ¯\_(ツ)_/¯
                </Alert>
            )}
            <Alert variant="info">
                <b>Fun Fact: </b>{funFact}
            </Alert>
        </div>
    );
}

export async function getServerSideProps(context) {
    let success = false;
    try {
        const client = await clientPromise;
        const db = client.db("main");
        const games = db.collection("games");

        const participant = {
            address: context.query[0],
            name: context.query[1],
        }

        await games.updateOne({_id: context.params.gameId}, {$push: {players: participant}});
        success = true;
    } catch (e) {
        console.error(e);
    }

    const funFactIndex = Math.floor(Math.random() * funFacts.length);
    const waitingSentenceIndex = Math.floor(Math.random() * sentences.length);
    const waitingSymbolIndex = Math.floor(Math.random() * endings.length);
    return {
        props: {
            success: success,
            funFact: funFacts[funFactIndex],
            waitingMessage: sentences[waitingSentenceIndex] + endings[waitingSymbolIndex],
        }
    }
}