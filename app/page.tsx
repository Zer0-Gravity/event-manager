import { auth } from "@/src/lib/auth";
import prisma from "@/src/lib/prisma";
import { format } from "date-fns";
import { headers } from "next/headers";
import Link from "next/link";

export default async function Home() {
    const session = await auth.api.getSession({ headers: await headers() });

    //Get the recent data
    const recentData = await prisma.event.findMany({
        where: { ownerId: session?.user.id },
        select: { title: true, location: true, eventDate: true },
        orderBy: { createdAt: "desc" },
        take: 4,
    });

    return (
        <div className="font-sans dark:bg-black w-full space-y-5">
            <header className="space-y-2">
                <h1 className="text-3xl font-bold">
                    Plan event and track your attendace fast
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
                    Create new account
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

            {session && (
                <div className="space-y-3">
                    <h1 className="text-xl font-bold">Recent event</h1>
                    <div className="w-full flex flex-col gap-4 border border-dashed rounded-lg p-4 h-100 overflow-y-auto border-[#222222] scrollbar">
                        {recentData.map((data, i) => (
                            <div
                                key={i}
                                className="border border-[#222222] p-3 w-full flex justify-between items-center rounded-lg hover:border-[#595959] transition-colors select-none cursor-pointer"
                            >
                                <div>
                                    <h1>{data.title}</h1>
                                    <p className="text-sm text-gray-500">
                                        {data.location}
                                    </p>
                                </div>
                                <h1>{format(data.eventDate, "PPPP")}</h1>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}
