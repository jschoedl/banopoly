import {useRouter} from 'next/router'
import AddressInput from "../../components/AddressInput";


const Post = () => {
    const router = useRouter()
    const {gameId} = router.query

    return <>
        <AddressInput names={["Dein Wallet"]} next="/lounge"/>
        {/*TODO*/}
        <p>Post: {gameId}</p>
    </>
}

export default Post
