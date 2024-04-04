
import { Button } from "@/components/ui/button";
import { getUserRooms } from "@/data-access/rooms";
import Link from "next/link";
import RoomCard from "./userroomcard";


export default async function YourRoomPage() {
  const rooms = await getUserRooms();
  return (
    <main className=" min-h-screen  p-16">
      <div className="flex justify-between items-center w-full mb-8">
        <h1 className="text-4xl">Your Room's</h1>
        <Button asChild>
          <Link href={"/create-room"}>Create Room</Link>
        </Button>
      </div>
      

      <div className="grid md:grid-cols-3 gap-4 grid-cols-1">
        {rooms.map((room) => {
          return (
             <RoomCard key={room.id} room={room} />            
          )
        })}
      </div>

    </main>
  );
}
