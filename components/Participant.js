import {formatLongString} from "../lib/helpers";

export default function Participant(props){
    return <>
        <h1>{props.name}</h1>
        <p>{formatLongString(props.address)}</p>
    </>
}