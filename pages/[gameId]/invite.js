import QRCode from "qrcode.react";
import {useRouter} from "next/router";


export default function Invite() {
    const router = useRouter();
    const {gameId} = router.query;

    let hostname = "";
    if (typeof window !== 'undefined')
        hostname = window.location.host;

    const joinURL = hostname + "/" + gameId + "/join";

    return <>
        <QRCode value={joinURL}/>
        <p>{joinURL}</p>
    </>
}