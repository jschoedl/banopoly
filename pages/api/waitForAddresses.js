import clientPromise from "../../lib/mongodb";
import {getKaliumImportFile, sleep} from "../../lib/helpers";

async function kaliumImportFile(collection, id) {
    while (true) {
        const game = await collection.findOne({_id: id})
        if (game.started) {
            return getKaliumImportFile(game);
        }
        await sleep(100);
    }
}

export default async function handler(req, res) {
    const client = await clientPromise;
    const db = client.db("main");
    const games = db.collection("games");

    const importFile = await kaliumImportFile(games, req.query.gameId);
    res.status(200).json(importFile);
}
