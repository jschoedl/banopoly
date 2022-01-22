import clientPromise from "../../lib/mongodb";
//{query: {gameId}}
export default async function handler(req, res) {
    const client = await clientPromise;
    const db = client.db("main");
    const games = db.collection("games");
    const currentGame = await games.findOne({_id: req.query.gameId})
    res.status(200).json({name: 'John Doe', result: currentGame})
}
