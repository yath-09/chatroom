'use server'

import { db } from "@/db";
import { room, Room } from "@/db/schema";
import { getSession } from "@/lib/auth";
import { revalidatePath } from "next/cache";

export async function createRoomAction(roomData:Omit<Room,"userId" |"id">) {
    const session=await getSession()


    if(!session) throw new Error("you must be logged in")


    await db.insert(room).values({...roomData,userId:session?.user.id});
    revalidatePath("/browse")// to remove the cache for any path that occurs after new entries to the database
}