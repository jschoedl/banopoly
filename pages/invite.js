import QRCode from "qrcode.react";


export default function Invite() {
    // TODO: dynamic ID
    let hostname = "";
    if (typeof window !== 'undefined')
        hostname = window.location.host;
    return <QRCode value={hostname + "/join/42"}/>
}