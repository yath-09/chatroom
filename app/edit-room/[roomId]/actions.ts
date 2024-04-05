'use server'

import { editRoom, getRoom } from "@/data-access/rooms";
import { Room } from "@/db/schema";
import { getSession } from "@/lib/auth";
import { redirect } from "next/navigation";

export async function editRoomAction(roomData:Omit<Room,"userId">) {
    const session=await getSession()

    if(!session) throw new Error("you must be logged in")
    //make sure it is the same user who created it 
    const room=await getRoom(roomData.id);
    if(room?.userId !==session.user.id) throw new Error("user Not authorized") 
    

    await editRoom({...roomData,userId:room.userId}); // potentially to checl if someother user doest not changes the user id of the curent user by payload 
    
    redirect("/your-rooms")// to remove the cache for any path that occurs after new entries to the database
} 