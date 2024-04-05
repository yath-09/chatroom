"use client"
import { TagsList } from "@/components/Badge"
import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Room } from "@/db/schema"
import { GithubIcon, PencilIcon, TrashIcon } from "lucide-react"
import Link from "next/link"
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { deleteRoomAction } from "./actions";

const RoomCard = ({ room }: { room: Room }) => {
    const tags = room.tags.split(",").map((tag) => tag.trim())
    return (
        <Card>
            <CardHeader className="relative">
                <Button className="absolute top-1 right-1" size="icon">
                 <Link href={`/edit-room/${room.id}`}>
                    <PencilIcon/>
                </Link>
                </Button>
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
                        <GithubIcon />
                        GitHub Project
                    </Link>)
                }

                <TagsList tags={tags} />

            </CardContent>
            <CardFooter className="flex gap-2 flex-col lg:flex-row overflow-hidden">
                <Button asChild><Link href={`/rooms/${room.id}`}>Join room</Link></Button>
                <AlertDialog>
                    <AlertDialogTrigger asChild>
                        <Button variant={"destructive"}>
                            <TrashIcon className="w-4 h-4 mr-2" /> Delete Room
                        </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                        <AlertDialogHeader>
                            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                            <AlertDialogDescription>
                                This action cannot be undone. This will permanently remove the
                                room and any data associated with it.
                            </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction
                                onClick={() => {
                                    deleteRoomAction(room.id);
                                }}
                            >
                                Yes, delete
                            </AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>

            </CardFooter>
        </Card>

    )
}

export default RoomCard
