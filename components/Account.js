import Balance from "./Balance";

export default function Account(props) {
    return <>
        <p>{props.name}</p>
        <Balance address={props.address}/>
    </>
}