import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { currentTrackIdState } from "../atoms/songAtom";
import useSpotify from "./useSpotify";

function useSongInfo() {

    const spotifyAPI = useSpotify();
    const [currentTrackId, setCurrentTrackId] = useRecoilState(currentTrackIdState);
    const [songInfo, setsongInfo] = useState()

    
    useEffect(() => {
        const fetchSongInfo = async () => {
            
            if (currentTrackId) {
                const trackInfo = await fetch(
                    `https://api.spotify.com/v1/tracks/${currentTrackId}`,
                    {
                        headers: {
                            Authorization: `Bearer ${spotifyAPI.getAccessToken()}`,
                        }
                    }
                ).then(res => res.json())
                setsongInfo(trackInfo)
            }
        }
        fetchSongInfo()
    }, [currentTrackId,spotifyAPI])

    return songInfo;
}

export default useSongInfo
