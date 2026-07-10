"use client";

import { useSession } from "@/src/lib/auth-client";
import Link from "next/link";

export default function Home() {
    const { data: session } = useSession();
    return (
        <div className="font-sans dark:bg-black w-full space-y-3">
            <header className="space-y-2">
                <h1 className="text-3xl font-bold">
                    Plan event and track RSVP fast
                </h1>
                <p className="text-sm text-gray-500">
                    Create event, share unique link, and watch status update in
                    realtime!
                </p>
            </header>
            <div className="flex gap-4 items-center">
                <Link
                    href={"/auth/sign-up"}
                    className="p-2 bg-white rounded-lg text-black font-semibold"
                >
                    Create account
                </Link>
                {!session && (
                    <Link
                        href={"/auth/sign-in"}
                        className="border-2 border-[#222222] p-2 rounded-lg text-gray-400"
                    >
                        Sign In
                    </Link>
                )}
                <Link
                    href={"/dashboard"}
                    className="border-2 border-[#222222] p-2 rounded-lg text-gray-400"
                >
                    Open Dashboard
                </Link>
            </div>
            <div className="flex justify-between gap-4">
                <div className="p-3 border border-[#222222] w-sm h-30 rounded-lg">
                    <h1 className="font-semibold">Create event</h1>
                    <p className="text-sm text-gray-500">
                        Plan and create your event
                    </p>
                </div>
                <div className="p-3 border border-[#222222] w-sm h-30 rounded-lg">
                    <h1 className="font-semibold">Share invite link</h1>
                    <p className="text-sm text-gray-500">
                        Share your link and invite people you know to attend
                        your event
                    </p>
                </div>
                <div className="p-3 border border-[#222222] w-sm h-30 rounded-lg">
                    <h1 className="font-semibold">Track attendace</h1>
                    <p className="text-sm text-gray-500">
                        Track your current attendace and see what their respond
                    </p>
                </div>
            </div>
        </div>
    );
}
