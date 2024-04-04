"use client"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

import { signIn, signOut, useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/mode-toggle";
import { LogInIcon, LogOutIcon } from "lucide-react";
import Image from "next/image"
import Link from "next/link";
import { link } from "fs";

function DropDownMenu() {
    const session = useSession();
    
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant={"link"} className="my-auto">
                    <Avatar className="mr-2">
                        <AvatarImage src={session.data?.user.image ?? ""} />
                        <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                    {session.data?.user.name}
                </Button></DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                    onClick={() =>
                        signOut(
                            {
                                callbackUrl: "/"
                            }
                        )}>
                    <LogOutIcon className="mr-2" />Sign Out</DropdownMenuItem>
                </DropdownMenuContent>
        </DropdownMenu>
    )

}


export function Header() {
    const session = useSession();
    const isLoggedIn=!!session.data
    return (
        <header className="container mx-auto dark:bg-gray-800 py-3 bg-gray-300 z-10 relative w-full" >
            <div className="flex justify-between items-center">
                <Link href="/" className="flex items-center gap-2 text-xl hover:text-emerald-600">
                  <Image
                   src="/logo.png"
                   width="60"
                   height="60" 
                   alt="Logo"
                   className="rounded-[15px]"
                   />   
                  DevRoom
                </Link>
                {isLoggedIn &&  
                
                <nav className="flex gap-4">
                    <Link href="/browse" className="hover:underline">Browse</Link>
                    <Link href="/your-rooms" className="hover:underline">Your Rooms</Link></nav>
                }
               
                <div className="flex gap-4 items-center">
                   {isLoggedIn && <DropDownMenu/>}
                   {!session.data && (
                     <Button
                        onClick={
                            ()=>signIn()
                        }  
                        variant={"link"}
                    >
                        <LogInIcon className="mr-2"/> Sign In
                     </Button>
                   )}
                    <ModeToggle />
                </div>
            </div>
        </header>
    )
}