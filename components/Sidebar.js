import { HeartIcon, HomeIcon, LibraryIcon, MusicNoteIcon, PlusCircleIcon, RssIcon, SearchIcon } from '@heroicons/react/outline';
import { signOut, useSession } from "next-auth/react"
import { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import useSpotify from '../hooks/useSpotify';
import { playlistIdState } from '../atoms/playListAtom'

function Sidebar() {

    const spotifyApi = useSpotify();
    const { data: session, status } = useSession();
    const [playLists, setPlayLists] = useState([]);
    const [playlist, setPlaylist] = useRecoilState(playlistIdState)

    useEffect(() => {
        if (spotifyApi.getAccessToken()) {
            spotifyApi.getUserPlaylists().then((data) => {
                setPlayLists(data.body.items)
            })
        }
    }, [session])


    return (
        <div className="h-screen p-5 overflow-y-scroll text-sm text-gray-500 border-r border-gray-900 scrollbar-hide pb-36 md:inline-flex sm:max-w[12rem] lg:text-sm hidden lg:max-w-[15rem]">
            <div className="space-y-4 font-bold">
                <button key={2} className="flex items-center space-x-2 hover:text-white">
                    <HomeIcon className="w-5 h5" />
                    <p>Home</p>
                </button>
                <button key={20} className="flex items-center space-x-2 hover:text-white">
                    <SearchIcon className="w-5 h5" />
                    <p>Search </p>
                </button>
                <button   key={3} className="flex items-center space-x-2 hover:text-white">
                    <LibraryIcon className="w-5 h5" />
                    <p> Your Library</p>
                </button>
                <hr key={123} className="border-t=[0.px] border-gray-900" />

                <button   key={4} className="flex items-center space-x-2 hover:text-white">
                    <PlusCircleIcon className="w-5 h5" />
                    <p>Create Playlist</p>
                </button>

                <button   key={5} className="flex items-center space-x-2 hover:text-white">
                    <HeartIcon className="w-5 h5" />
                    <p> Your Library</p>
                </button>

                <button   key={6} className="flex items-center space-x-2 hover:text-white">
                    <RssIcon className="w-5 h5" />
                    <p>Your Episodes </p>
                </button>
                <hr key={254} className="border-t=[0.px] border-gray-900" />

                {playLists.map((playlist) => (
                    <>
                        <div className='flex items-center '  key={playlist.id}>

                            {playlist.images[0] ?
                                (<img src={playlist.images[0].url} alt="" className="w-10 h-10 mr-4 rounded-full " />)
                                : <MusicNoteIcon className="w-10 h-10 p-1 mr-4 rounded-full " />}

                            <p onClick={() => setPlaylist(playlist.id)} className="flex-1 max-w-[13rem] capitalize cursor-pointer hover:text-white font-bold">
                                {playlist.name}
                            </p>


                        </div>

                    </>
                ))}
            </div>

        </div>
    )
}

export default Sidebar
