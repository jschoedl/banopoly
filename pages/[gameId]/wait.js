import clientPromise from "../../lib/mongodb";
import {Alert} from "react-bootstrap";
import funFacts from "../../public/funFacts";

export default function Home({success, funFact}) {
    return (
        <div>
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
            account: context.query[0]
        }

        await games.updateOne({_id: context.params.gameId}, {$push: {players: participant}});
        success = true;
    } catch (e) {
        console.error(e);
    }

    const funFactIndex = Math.floor(Math.random() * funFacts.length);
    return {
        props: {
            success: success,
            funFact: funFacts[funFactIndex]
        }
    }
}