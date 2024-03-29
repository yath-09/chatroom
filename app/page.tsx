import { Button } from "@/components/ui/button";
import { db } from "@/db";
import Link from "next/link";


export default async function Home() {
  const rooms=await db.query.room.findMany();
  return (
    <main className=" min-h-screen  p-16">
      <div className="flex justify-between items-center w-full">
        <h1 className="text-4xl">Find Dev Room</h1>
        <Button asChild>
          <Link href={"/create-room"}>Create Room</Link>
        </Button>
      </div>
      
      {rooms.map((room)=>{
        return(
           <div key={room.id}>
             {room.name}
           </div>
        )
        })}
    </main>
  );
}
