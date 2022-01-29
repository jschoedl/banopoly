import SpotifyNowPlaying from "./SpotifyNowPlaying";

export default function Controls(props) {
    return <div className="spotify-player controls">
        <SpotifyNowPlaying
            client_id={props.clientId}
            client_secret={props.clientSecret}
            refresh_token={props.refreshToken}
        />
    </div>
}