"use client"
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
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
import { DeleteIcon, LogInIcon, LogOutIcon } from "lucide-react";
import Image from "next/image"
import Link from "next/link";
import { useState } from "react";
import { deleteUserAction } from "./actions";


function DropDownMenu() {
    const session = useSession();
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                        <AlertDialogDescription>
                            This action cannot be undone. This will permanently remove your account and the data associated with it
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                            onClick={async () => {
                                await deleteUserAction();
                                signOut({ callbackUrl: "/" });
                            }}
                        >
                            Yes, delete my account
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>

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
                        <LogOutIcon className="mr-2" />Sign Out
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => setIsOpen(true)}>
                        <DeleteIcon className="mr-2" />Delete Account
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </>
    )

}


export function Header() {
    const session = useSession();
    const isLoggedIn = !!session.data
    return (
        <header className=" dark:bg-gray-800 py-3 bg-gray-300 z-10 relative w-full" >
            <div className=" container mx-auto flex justify-between items-center">
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
                    {isLoggedIn && <DropDownMenu />}
                    {!session.data && (
                        <Button
                            onClick={
                                () => signIn()
                            }
                            variant={"link"}
                        >
                            <LogInIcon className="mr-2" /> Sign In
                        </Button>
                    )}
                    <ModeToggle />
                </div>
            </div>
        </header>
    )
}