import { getRoom } from "@/data-access/rooms";
import { GithubIcon} from "lucide-react"
import { Badge } from "@/components/ui/badge";
import Link from "next/link"


export default async function RoomPage(props: { params: { roomId: string } }) {
    const roomId = props.params.roomId;
    const room = await getRoom(roomId);
    if(!room) return<div>Room not found </div> // used for error for room not foind
    
    const tags=room.tags.split(",").map((tag)=>tag.trim())

    return (
        <div className="min-h-screen grid grid-cols-4 text-black">
            <div className="col-span-3 p-5">
                <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-8">
                    Video player
                </div>
            </div>
            <div className="col-span-1  p-5">
                <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-8 flex flex-col gap-4">
                    <h1 className="text-base">{room?.name}</h1>
                        {room.githubRepo &&
                            (<Link href={room.githubRepo} 
                                className="flex items-center gap-2 self-center"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                            <GithubIcon />
                            GitHub
                            </Link>)
                        }
                    <p className="text-base text-gray-600">{room?.description}</p>
                    <h4>Tags</h4>
                    <div className="flex gap-2 flex-wrap">
                        {tags.map((lang)=>(
                            <Badge className="w-fit" key={lang}>{lang}</Badge>
                        ))}
                    </div>
                    
                </div>
            </div>
        </div>
    )
}