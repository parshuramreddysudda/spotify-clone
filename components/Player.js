import { FastForwardIcon, PauseIcon, PlayIcon, ReplyIcon, RewindIcon, SwitchHorizontalIcon, VolumeOffIcon, VolumeUpIcon } from "@heroicons/react/solid";
import { VolumeUpIcon as VolumeDownIcon } from '@heroicons/react/outline'
import { useSession } from "next-auth/react";
import { useCallback, useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { currentTrackIdState, isPlayingState } from "../atoms/songAtom";
import useSongInfo from "../hooks/useSongInfo";
import useSpotify from "../hooks/useSpotify"
import { debounce } from "lodash";


function Player() {
    const spotifyAPI = useSpotify();
    const { data: session, status } = useSession();
    const [currentTrackId, setCurrentTrackId] = useRecoilState(currentTrackIdState);
    const [isPlaying, setIsPlaying] = useRecoilState(isPlayingState);
    const [volume, setVolume] = useState(50);
    const songInfo = useSongInfo();
    console.log(songInfo)
    const fetchCurrentSong = () => {
        if (!songInfo) {
            spotifyAPI.getMyCurrentPlayingTrack().then((data) => {
                console.log("Now playing :", data.body?.item);
                setCurrentTrackId(data.body?.item?.id)

                spotifyAPI.getMyCurrentPlaybackState().then((data) => {
                    setIsPlaying(data.body?.is_playing);
                })
            })
        }
    }
    const handlePlyPause = () => {
        spotifyAPI.getMyCurrentPlaybackState().then((data) => {
            if (data.body.is_playing) {
                spotifyAPI.pause();
                setIsPlaying(false)
            } else {
                spotifyAPI.play()
                setIsPlaying(true)
            }
        })
    }

    useEffect(() => {
        if (spotifyAPI.getAccessToken() && !currentTrackId) {
            fetchCurrentSong();
            setVolume(50);
        }
    }, [currentTrackIdState, spotifyAPI, session])

    useEffect(() => {
        if (volume > 0 && volume < 100) {
            debouncedAdjustVolume(volume)
        }
    }, [volume])


    const debouncedAdjustVolume = useCallback(
        debounce((volume) => {
            spotifyAPI.setVolume(volume).catch(()=>{})
        }, 500), [])


    return (
        <div className="grid h-24 grid-cols-3 px-2 text-xs text-white bg-gradient-to-b from-black to-gray-900 md:text-base md:px-8">
            <div className="flex items-center grid-cols-3 px-2 space-x-4 text-xs md:text-base">
                <img className="hidden w-10 h-10 md:inline" src={songInfo?.album?.images?.[0].url} alt="" />

                <div>
                    <h3>{songInfo?.name}</h3>
                    <p>{songInfo?.artists?.[0]?.name}</p>
                </div>
            </div>
            <div className="flex items-center justify-evenly">
                <SwitchHorizontalIcon className="button" />
                <RewindIcon
                    onClick={() => spotifyAPI.skipToPrevious()}
                    className="button"
                />
                {isPlaying ?
                    (
                        <PauseIcon onClick={() => handlePlyPause()} className="w-10 h-10 button" />
                    ) :
                    (
                        <PlayIcon onClick={() => handlePlyPause()} className="w-10 h-10 button" />
                    )
                }
                <FastForwardIcon
                    onClick={() => spotifyAPI.skipToNext()}
                    className="button"
                />
                <ReplyIcon className="button" />


            </div>
            <div className="flex items-center justify-end pr-5 md:space-x-4 ">
                <VolumeDownIcon
                    onClick={() => volume > 0 && setVolume(volume - 10)}
                    className="button"
                />
                <input
                    className=" w-14 md:w-28"
                    type="range"
                    max={100}
                    min={10}
                    value={volume}
                    onChange={(e) => setVolume(Number(e.target.value))}
                />
                <VolumeUpIcon
                    onClick={() => volume < 100 && setVolume(volume + 10)}
                    className="button"

                />

            </div>
        </div>
    )
}

export default Player
