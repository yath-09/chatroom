"use client"

import { signIn, signOut, useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/mode-toggle";

export function Header(){
  const session=useSession();
 return(
        <div>
            {session.data ?(
               <Button onClick={()=>signOut()}>Sign Out</Button>
            ):(
                <Button onClick={()=>signIn("google")}>Sign In</Button>
            )}
        <ModeToggle/>   
        </div>
    )
}