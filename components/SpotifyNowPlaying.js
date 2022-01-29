import {useEffect, useState} from "react";
import getNowPlayingItem from "../lib/spotify";
import {Stack} from "react-bootstrap";
import {formatLongString} from "../lib/helpers";

function SpotifyNowPlaying(props) {
    const [result, setResult] = useState({});

    useEffect(() => {
        setInterval(() =>
                Promise.all([
                    getNowPlayingItem(
                        props.client_id,
                        props.client_secret,
                        props.refresh_token
                    ),
                ]).then((results) => {
                    setResult(results[0]);
                }),
            3000
        );
    }, []);

    return (
        result.isPlaying ? (<Stack direction={"horizontal"}>
                <img className="cover" src={result.albumImageUrl}/>
                <div className="trackInfo">
                    <h1>{formatLongString(result.title)}</h1>
                    <p id="trackartist">
                        {formatLongString(result.artist, 50)}
                    </p>
                </div>
            </Stack>) :
            <h1>Gerade wird nichts wiedergegeben.</h1>
    )
}

export default SpotifyNowPlaying;
