import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Room } from "@/db/schema"
import { GithubIcon} from "lucide-react"
import Link from "next/link"
import { Button } from "./ui/button"
const RoomCard = ({room}:{room:Room}) => {
    return (
        <Card>
            <CardHeader>
                <CardTitle>{room.name}</CardTitle>
                <CardDescription>{room.description}</CardDescription>
            </CardHeader>
            <CardContent>
              {room.githubRepo && 
              (<Link href={room.githubRepo} className="flex items-center gap-2"
                target="_blank"
                rel="noopener noreferrer"
              >
                <GithubIcon/>
                 GitHub Project  
              </Link>)
              }
            </CardContent>
            <CardFooter>
                <Button asChild><Link href={`/rooms/${room.id}`}>Join room</Link></Button>
            </CardFooter>
        </Card>

    )
}

export default RoomCard
