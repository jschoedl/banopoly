import {useRouter} from 'next/router'
import AddressInput from "../../components/AddressInput";


export default function JoinGame() {
    const router = useRouter()
    const {gameId} = router.query

    return <>
        <AddressInput accountNames={["Dein Wallet"]} otherNames={["Name"]} next={"/" + gameId + "/wait"}/>
    </>
}
