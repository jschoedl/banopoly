import {useRouter} from 'next/router'
import AddressInput from "../../components/AddressInput";


export default function JoinGame() {
    const router = useRouter()
    const {gameId} = router.query

    return <>
        <h1>Banopoly</h1><br/>
        <p>Hallo! Einmal Name und Addresse, bitte.</p><br/>
        <AddressInput accountNames={["Adresse"]} otherNames={["Name"]} next={"/" + gameId + "/wait"}/>
    </>
}
