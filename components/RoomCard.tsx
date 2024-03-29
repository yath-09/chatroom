import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Badge } from "./ui/badge" 
import { Room } from "@/db/schema"
import { GithubIcon} from "lucide-react"
import Link from "next/link"
import { Button } from "./ui/button"
const RoomCard = ({room}:{room:Room}) => {
    const tags=room.tags.split(",").map((tag)=>tag.trim())
    return (
        <Card>
            <CardHeader>
                <CardTitle>{room.name}</CardTitle>
                <CardDescription>{room.description}</CardDescription>
            </CardHeader>
            <CardContent>
              {room.githubRepo && 
              (<Link href={room.githubRepo} 
                className="flex gap-2 mb-2"
                target="_blank"
                rel="noopener noreferrer"
              >
                <GithubIcon/>
                GitHub Project
              </Link>)
              }
               <div className="flex gap-2 flex-wrap mb-4">
                    {tags.map((lang)=>(
                        <Badge className="w-fit" key={lang}>{lang}</Badge>
                    ))}
                </div> 
            </CardContent>
            <CardFooter>
                <Button asChild><Link href={`/rooms/${room.id}`}>Join room</Link></Button>
            </CardFooter>
        </Card>

    )
}

export default RoomCard
