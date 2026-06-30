"use client";

import { signOut, useSession } from "@/src/lib/auth-client";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuPortal,
    DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import { LogIn, LogOut, UserPlus2, UserRound } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function DropdownAccount() {
    const { data: session } = useSession();
    const router = useRouter();

    const handleLogOut = async () => {
        try {
            await signOut();
            router.push("/"); //Change the page to the home page after the logout done
        } catch (error) {
            console.log(error);
        }
    };
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild className="outline-none">
                <button className="h-8 w-8 rounded-full bg-white flex items-center justify-center">
                    <UserRound size={18} color="black" />
                </button>
            </DropdownMenuTrigger>

            <DropdownMenuPortal>
                <DropdownMenuContent
                    align="end"
                    sideOffset={10}
                    className="bg-white p-2 w-50 text-black rounded-lg space-y-1"
                >
                    {!session ? (
                        <>
                            <DropdownMenuItem className="outline-none">
                                <Link
                                    href={"/auth/sign-in"}
                                    className="flex gap-5 p-2 hover:bg-gray-200 rounded-lg transition-colors"
                                >
                                    <LogIn size={18} />
                                    <span className="font-semibold text-sm">
                                        Sign In
                                    </span>
                                </Link>
                            </DropdownMenuItem>

                            <DropdownMenuItem className="outline-none">
                                <Link
                                    href={"/auth/sign-up"}
                                    className="flex gap-5 p-2 hover:bg-gray-200 rounded-lg transition-colors"
                                >
                                    <UserPlus2 size={18} />
                                    <span className="font-semibold text-sm">
                                        Sign Up
                                    </span>
                                </Link>
                            </DropdownMenuItem>
                        </>
                    ) : (
                        <>
                            <DropdownMenuItem className="outline-none">
                                <button
                                    onClick={handleLogOut}
                                    className="flex gap-5 p-2 bg-red-400 hover:bg-red-500 rounded-lg transition-colors w-full"
                                >
                                    <LogOut size={18} color="white" />
                                    <span className="font-semibold text-sm text-white">
                                        Log Out
                                    </span>
                                </button>
                            </DropdownMenuItem>
                        </>
                    )}
                </DropdownMenuContent>
            </DropdownMenuPortal>
        </DropdownMenu>
    );
}
