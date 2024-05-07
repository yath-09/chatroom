import RoomCard from "@/components/RoomCard";
import { SearchBar } from "@/components/search-bar";
import { Button } from "@/components/ui/button";
import { getRooms } from "@/data-access/rooms";
import Image from "next/image";
import Link from "next/link";


export default async function Home({ searchParams }: {
  searchParams: {
    search: string
  }
}) {
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
        <SearchBar />
      </div>


      <div className="grid md:grid-cols-3 gap-4 grid-cols-1">
        {rooms.map((room) => {
          return (
            <RoomCard key={room.id} room={room} />
          )
        })}
      </div>

      {rooms.length === 0 && (
        <div className="flex flex-col gap-4 justify-center items-center mt-24">
          <Image
            className="rounded-[20px]"
            src="/notfound.png"
            width="200"
            height="200"
            alt="no data image"
          />

          <h2 className="text-2xl">No rooms availabel now</h2>
        </div>
      )}

    </main>
  );
}
