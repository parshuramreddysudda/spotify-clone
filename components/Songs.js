import { useRecoilValue } from "recoil"
import { playlistState } from "../atoms/playListAtom"
import Song from "./Song";

function Songs() {

    const playList=useRecoilValue(playlistState);
    return (
        <div className="flex flex-col px-8 pt-5 space-y-2 font-thin text-white pb-28">
            {playList?.tracks.items.map((track,i)=>(
                <Song
                    key= {track.track.id}
                    track={track}
                    order={i}

                />
            ))}
        </div>
    )
}

export default Songs