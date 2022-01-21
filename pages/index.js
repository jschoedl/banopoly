import AddressInput from "../components/AddressInput";
import crypto from "crypto";


export default function Index() {
    const gameId = crypto.randomBytes(8).toString("hex");
    return (<>
            <AddressInput accountNames={["Bank", "Mitte"]} next={"/" + gameId + "/invite"}/>
        </>
    );
}
