import clientPromise from "../../lib/mongodb";
import {Alert} from "react-bootstrap";
import funFacts from "../../public/funFacts";

export default function Home({success, funFact}) {
    return (
        <div>
            {success ? (
                <h2 className="subtitle">You are connected to MongoDB</h2>
            ) : (
                <h2 className="subtitle">
                    You are NOT connected to MongoDB. Check the <code>README.md</code>{' '}
                    for instructions.
                </h2>
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
        success = true;
        //TODO: insert address


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