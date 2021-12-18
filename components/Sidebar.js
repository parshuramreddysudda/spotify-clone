import { HeartIcon, HomeIcon, LibraryIcon, PlusCircleIcon, RssIcon, SearchIcon } from '@heroicons/react/outline'
import {signOut, useSession} from "next-auth/react"

function Sidebar() {
    const {data:session,status}=useSession();
    console.log(session)
    return (
        <div className="p-5 text-sm text-gray-500 border-r border-gray-900  overflow-y-scroll h-screen">
            <div className="space-y-4">

            <button className="flex items-center space-x-2 hover:text-white" onClick={()=>signOut()}>
                    <p>Logout</p>
                </button>
                <button className="flex items-center space-x-2 hover:text-white">
                    <HomeIcon className="w-5 h5" />
                    <p>Home</p>
                </button>
                <button className="flex items-center space-x-2 hover:text-white">
                    <SearchIcon className="w-5 h5" />
                    <p>Search </p>
                </button>
                <button className="flex items-center space-x-2 hover:text-white">
                    <LibraryIcon className="w-5 h5" />
                    <p> Your Library</p>
                </button>
                <hr className="border-t=[0.px] border-gray-900" />

                <button className="flex items-center space-x-2 hover:text-white">
                    <PlusCircleIcon className="w-5 h5" />
                    <p>Create Playlist</p>
                </button>

                <button className="flex items-center space-x-2 hover:text-white">
                    <HeartIcon className="w-5 h5" />
                    <p> Your Library</p>
                </button>

                <button className="flex items-center space-x-2 hover:text-white">
                    <RssIcon className="w-5 h5" />
                    <p>Your Episodes </p>
                </button>
                <hr className="border-t=[0.px] border-gray-900" />

                {Array.from(Array(20)).map((_, i) => (
                    <p className="cursor-pointer hover:text-white">
                        PlayList Name
                    </p>
                ))}
            </div>

        </div>
    )
}

export default Sidebar
