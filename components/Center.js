import { ChevronDownIcon } from "@heroicons/react/outline";
import { shuffle } from "lodash";
import { signOut, useSession } from "next-auth/react"
import { useEffect, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { playlistIdState, playlistState } from "../atoms/playListAtom";
import useSpotify from "../hooks/useSpotify";
import Songs from "./Songs";

const colors = [
    "from-indigo-500",
    "from-blue-500",
    "from-green-500",
    "from-red-500",
    "from-yellow-500",
    "from-purple-500",
    "from-pink-500",
    "from-purple-500",
    "from-gray-500",

]

function Center() {

    const spotifyApi = useSpotify();

    const { data: session } = useSession();

    const [color, setColor] = useState(null)


    const playlistID = useRecoilValue(playlistIdState);
    const [playlist, setPlaylist] = useRecoilState(playlistState)

    useEffect(() => {
        setColor(shuffle(colors).pop());

    }, [playlistID])

    useEffect(() => {
        spotifyApi.getPlaylist(playlistID).then((data) => {
            setPlaylist(data.body);
        }).catch((error) => {
            console.error("Plalist Error is " + error);
        });
    }, [spotifyApi, playlistID])




    return (
        <div className="flex-grow h-screen overflow-y-scroll text-white scrollbar-hide ">

            <header className="absolute top-5 right-8">
                <div className="flex items-center p-1 pr-2 space-x-3 bg-black rounded-full cursor-pointer opacity-90 hover:opacity-80" onClick={()=> signOut()}>
                    <img className="w-12 h-12 rounded-full" src={session?.user?.image} alt="user " />
                    <h2>{session?.user?.name}</h2>
                    <ChevronDownIcon className="w-5 h-5 " />
                </div>
            </header>

            <section className={`flex items-end text-white space-x-7 bg-gradient-to-b to-black ${color} h-80 padding-8`}>
                <img className="ml-6 shadow-2xl h-44 w-44" src={playlist?.images?.[0]?.url} alt="" />
                <div className="flex flex-col items-baseline space-y-2">
                    <p>Playlist</p>
                    <h1 className="text-2xl font-extrabold md:text-3xl xl:text-6xl">{playlist?.name}</h1>
                    <div className="flex space-x-3">
                    <h4 className="text-sm font-light">{playlist?.tracks.items.length} Tracks</h4>
                  {playlist?.followers?<h4 className="text-sm font-light">{playlist?.followers.total} Followers</h4>:""} 
                    </div>
                </div>
            </section>

            <Songs/>
        </div>
    )
}

export default Center
