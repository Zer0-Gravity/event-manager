import { Badge } from "@/components/ui/badge";
import { auth } from "@/src/lib/auth";
import prisma from "@/src/lib/prisma";
import { format } from "date-fns";
import { Dot, Frown, Plus } from "lucide-react";
import { headers } from "next/headers";
import Link from "next/link";

export default async function DashboardPage() {
    const session = await auth.api.getSession({
        headers: await headers(),
    });

    const events = await prisma.event.findMany({
        where: { ownerId: session?.user.id },
        select: {
            id: true,
            title: true,
            location: true,
            description: true,
            eventDate: true,
            eventRsvps: { select: { status: true } },
        },
    });

    return (
        <main className="w-full space-y-5 p-4">
            <header className="flex justify-between">
                <div>
                    <h1 className="font-bold text-xl md:text-2xl">
                        Your events
                    </h1>
                    <p className="text-xs md:text-sm text-gray-500">
                        Track attendee response and manage invite links
                    </p>
                </div>

                <Link
                    href="/events/new"
                    className="h-10 min-w-10 p-1.5 bg-white font-semibold text-sm rounded-lg text-black flex items-center justify-center"
                >
                    <span className="hidden md:block">Create Event</span>
                    <Plus size={18} className="block md:hidden" />
                </Link>
            </header>

            {/* Event List Here */}
            <div className="grid md:grid-cols-2 gap-2">
                {events.length === 0 ? (
                    <div className="flex gap-3 items-center justify-center border-[#222222] border rounded-lg p-4">
                        <Frown size={30} />
                        <div>
                            <h1 className="font-semibold">No event yet</h1>
                            <p className="text-sm text-gray-500">
                                Let&apos;s make new one and start invite
                                people!!
                            </p>
                        </div>
                    </div>
                ) : (
                    events.map((event) => {
                        //Calculate the status total for specific event status
                        const counts = event.eventRsvps.reduce(
                            (acc, current) => {
                                if (current.status === "going") acc.going += 1;
                                if (current.status === "maybe") acc.maybe += 1;
                                if (current.status === "not_going")
                                    acc.not_going += 1;
                                return acc;
                            },
                            { going: 0, maybe: 0, not_going: 0 },
                        );

                        return (
                            <div
                                key={event.id}
                                className="border border-[#222222] p-3 rounded-lg space-y-3"
                            >
                                <header className="flex justify-between">
                                    <h1 className="font-semibold">
                                        {event.title}
                                    </h1>
                                    <Link
                                        href={`events/${event.id}`}
                                        className="bg-white text-black py-1 px-2  text-sm rounded-lg"
                                    >
                                        Open
                                    </Link>
                                </header>

                                <div className="space-x-3">
                                    <Badge>Going: {counts.going}</Badge>
                                    <Badge>Maybe: {counts.maybe}</Badge>
                                    <Badge>Not going: {counts.not_going}</Badge>
                                </div>

                                <p className="text-xs md:text-sm text-gray-500 flex items-center">
                                    {format(event.eventDate, "MM/dd/yyyy")}
                                    <Dot />
                                    {event.location}
                                </p>
                            </div>
                        );
                    })
                )}
            </div>
        </main>
    );
}
