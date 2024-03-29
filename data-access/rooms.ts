import { db } from "@/db";
import { room } from "@/db/schema";
import { eq } from "drizzle-orm";
import { unstable_noStore } from "next/cache";
// prevemt the first call of db from the static loading of th epage 
export  async function getRooms(){
    unstable_noStore(); // making the route dynamic 
    const rooms=await db.query.room.findMany();
    return rooms;
}

export  async function getRoom(roomId:string){
    unstable_noStore();  
    return await db.query.room.findFirst(
        {where:eq(room.id,roomId),}
    );
}