import SpotifyWebApi from "spotify-web-api-node";

const scopes = [
    "user-read-email",
    "playlist-read-private",
    "playlist-read-collaborative",
    "user-read-email",
    "user-top-read",
    "user-read-currently-playing",
    "user-read-recently-played",
    "streaming",
    "user-library-read",
    "user-follow-read",
    // "user-modify-playback-state",
    "user-read-playback-state",
].join(",");

const params = {
    scope:scopes
};

const queryParamString = new URLSearchParams(params);

const LOGIN_URL = "https://accounts.spotify.com/authorize?" + queryParamString.toString();

const spotifyApi = new SpotifyWebApi({
    clientId: process.env.NEXT_PUBLIC_SPOTIFY_ID,
    clientSecret: process.env.NEXT_PUBLIC_SPOTIFY_SECRET,
    
})

export default spotifyApi;

export { LOGIN_URL };