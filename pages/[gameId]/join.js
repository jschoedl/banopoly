import {useRouter} from 'next/router'
import AddressInput from "../../components/AddressInput";


export default function JoinGame() {
    const router = useRouter()
    const {gameId} = router.query

    return <>
        <AddressInput names={["Dein Wallet"]} next={"/" + gameId + "/wait"}/>
    </>
}
