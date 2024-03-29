import { db } from "@/db";
import { unstable_noStore } from "next/cache";
// prevemt the first call of db from the static loading of th epage 
export  async function getRooms(){
    unstable_noStore(); // making the route dynamic 
    const rooms=await db.query.room.findMany();
    return rooms;
}