import clientPromise from "../../lib/mongodb";

export default function Home({success}) {
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
        </div>
    );
}

export async function getServerSideProps(context) {
    try {
        const client = await clientPromise;
        const db = client.db("main");

        //TODO: insert address

        return {
            props: {success: true}
        }
    } catch (e) {
        console.error(e)
        return {
            props: {success: false},
        }
    }
}