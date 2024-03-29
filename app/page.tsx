import RoomCard from "@/components/RoomCard";
import { Button } from "@/components/ui/button";
import { getRooms } from "@/data-access/rooms";
import Link from "next/link";


export default async function Home() {
  const rooms = await getRooms();//layer of abstrations is what os good to follow
  // at first call this static apge might not be able to fetch the db so prevent it we use a method  

  return (
    <main className=" min-h-screen  p-16">
      <div className="flex justify-between items-center w-full mb-8">
        <h1 className="text-4xl">Find Dev Room</h1>
        <Button asChild>
          <Link href={"/create-room"}>Create Room</Link>
        </Button>
      </div>

      <div className="grid grid-cols-3 gap-4">
        {rooms.map((room) => {
          return (
             <RoomCard key={room.id} room={room} />
          )
        })}
      </div>

    </main>
  );
}
