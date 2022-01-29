import AddressInput from "../components/AddressInput";
import crypto from "crypto";


export default function Index() {
    const gameId = crypto.randomBytes(8).toString("hex");
    return (<>
            <h1>Banopoly</h1><br/>
            <p>Mit welchen Konten soll gespielt werden?</p><br/>
            <AddressInput accountNames={["Bank", "Mitte"]} next={"/" + gameId + "/invite"}/>
        </>
    );
}