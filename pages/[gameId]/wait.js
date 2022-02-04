import clientPromise from "../../lib/mongodb";
import {Alert, Button, Stack} from "react-bootstrap";
import {endings, sentences} from "../../public/waitingMessages";
import {useEffect, useState} from "react";
import {FaRegCheckCircle} from "react-icons/fa";

export default function Home({success, apiHost, gameId, funFact, waitingMessage}) {
    let [filename, setFilename] = useState("");

    async function updateOnGameStart() {
        while (true) {
            let response = await fetch(apiHost + "/api/waitForAddresses?gameId=" + gameId)
            if (response.status !== 504) { // Vercel timeout
                let blob = await response.blob();
                blob = blob.slice(0, blob.size, "text/plain");
                setFilename(URL.createObjectURL(blob));
                return;
            }
        }
    }

    useEffect(() => updateOnGameStart(), []);

    return (
        <Stack gap={3}>
            {success
                ? filename ? <>
                    <h1><FaRegCheckCircle className="large-icon"/></h1>
                    <Button variant="primary" href={filename} download={gameId + ".txt"}>Adressdaten
                        herunterladen</Button>
                    <Alert variant="success">
                        Importiert diese Adressen in eurem Kalium Wallet.
                    </Alert>
                </> : <>
                    <h1>{waitingMessage}</h1>
                    {funFact &&
                        <Alert variant="info">
                            <b>Fun Fact: </b>{funFact}
                        </Alert>
                    }
                </>
                : (<Alert variant="warning">
                    Fehler beim Eintragen in die Datenbank ¯\_(ツ)_/¯
                </Alert>)}
        </Stack>
    );
}

export async function getServerSideProps(context) {
    let success = false;
    let funFactsResult;
    if (process.env.FUN_FACTS_URL)
        funFactsResult = fetch(process.env.FUN_FACTS_URL).then(res => res.text()).then(newFunFacts => {
            if (newFunFacts)
                return newFunFacts.split("\n");
        });

    try {
        const client = await clientPromise;
        const db = client.db("main");
        const games = db.collection("games");

        const participant = {
            address: context.query[0],
            name: context.query[1],
        }

        await games.updateOne({_id: context.params.gameId}, {$addToSet: {players: participant}});

        success = true;
    } catch (e) {
        console.error(e);
    }

    let funFacts = await funFactsResult;
    let selectedFunFact;
    if (funFacts) {
        const funFactIndex = Math.floor(Math.random() * funFacts.length);
        selectedFunFact = funFacts[funFactIndex];
    }

    const waitingSentenceIndex = Math.floor(Math.random() * sentences.length);
    const waitingSymbolIndex = Math.floor(Math.random() * endings.length);
    return {
        props: {
            success: success,
            apiHost: process.env.API_HOST,
            gameId: context.params.gameId,
            funFact: selectedFunFact || null,
            waitingMessage: sentences[waitingSentenceIndex] + endings[waitingSymbolIndex],
        }
    }
}