import RoomCard from "@/components/RoomCard";
import { SearchBar } from "@/components/search-bar";
import { Button } from "@/components/ui/button";
import { getRooms } from "@/data-access/rooms";
import Link from "next/link";


export default async function Home({searchParams}:{searchParams:{
  search:string
}}) 
{
  const rooms = await getRooms(searchParams.search);
  return (
    <main className=" min-h-screen  p-16">
      <div className="flex justify-between items-center w-full mb-8">
        <h1 className="text-4xl">Find Dev Room</h1>
        <Button asChild>
          <Link href={"/create-room"}>Create Room</Link>
        </Button>
      </div>
      <div className="mb-12">
        <SearchBar/>
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
