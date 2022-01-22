import Balance from "./Balance";

export default function Account(props) {
    return <div className="account">
        <h2>{props.name}</h2>
        <h1><Balance address={props.address} factor={1_000_000_000} decimals={0}/>€</h1>
        <h2 className="yellow">
            <img src="/banano_icon.svg" className="icon"/>
            <Balance address={props.address}/>
        </h2>
    </div>
}