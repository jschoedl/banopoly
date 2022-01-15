import clientPromise from "../lib/mongodb";

export default function Home({isConnected}) {
    return (
        <div>
            {isConnected ? (
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
        // client.db() will be the default database passed in the MONGODB_URI
        // You can change the database by calling the client.db() function and specifying a database like:
        // const db = client.db("myDatabase");
        // Then you can execute queries against your database like so:
        // db.find({}) or any of the MongoDB Node Driver commands
        await clientPromise
        return {
            props: {isConnected: true},
        }
    } catch (e) {
        console.error(e)
        return {
            props: {isConnected: false},
        }
    }
}