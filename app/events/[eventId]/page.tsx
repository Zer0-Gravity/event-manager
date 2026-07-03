"use server";

import { Badge } from "@/components/ui/badge";
import { generateInviteLink } from "@/src/component/utils/generateInviteLink";
import { auth } from "@/src/lib/auth";
import prisma from "@/src/lib/prisma";
import { format, formatDistanceToNow } from "date-fns";
import { Calendar, Dot, MapPin } from "lucide-react";
import { headers } from "next/headers";
import Link from "next/link";

export default async function DetailEventPage({
    params,
}: {
    params: Promise<{ eventId: string }>;
}) {
    const { eventId } = await params;

    //get logged user id
    const session = await auth.api.getSession({
        headers: await headers(),
    });

    //Grab the database from the server
    const event = await prisma.event.findFirst({
        where: { id: eventId, ownerId: session?.user.id },
        include: {
            eventRsvps: { select: { status: true } },
            eventInvite: { select: { token: true } },
        },
    });

    if (!event) {
        return <div>No event matched with the id or please login first</div>;
    }

    //Count status total
    const counts = event.eventRsvps.reduce(
        (acc, current) => {
            if (current.status === "going") acc.going += 1;
            if (current.status === "maybe") acc.maybe += 1;
            if (current.status === "not_going") acc.not_going += 1;
            return acc;
        },
        { going: 0, maybe: 0, not_going: 0 },
    );

    const handleInviteLink = await generateInviteLink.bind(null, event.id);

    return (
        <main className="w-full space-y-5">
            <header className="flex justify-between">
                <h1 className="font-bold text-2xl">{event.title}</h1>
                <Link
                    href={"/dashboard"}
                    className="bg-white p-1 rounded-sm text-sm text-black"
                >
                    Back
                </Link>
            </header>
            <div className="space-y-2">
                <div className="flex gap-4 text-sm">
                    <div className="flex gap-2">
                        <Calendar size={18} />
                        <p>{format(event.eventDate, "PPPP")}</p>
                    </div>
                    <Dot />
                    <div className="flex gap-2">
                        <MapPin size={18} />
                        <p>{event.location}</p>
                    </div>
                </div>
                <div className="space-x-3">
                    <Badge variant="secondary">Going: {counts.going}</Badge>
                    <Badge variant="secondary">Maybe: {counts.maybe}</Badge>
                    <Badge variant="secondary">
                        Not going: {counts.not_going}
                    </Badge>
                </div>
                <p className="text-xs text-gray-400">
                    {`Created ${formatDistanceToNow(event.createdAt, { addSuffix: true })}`}
                </p>
            </div>

            <p className="border border-[#222222] p-3 h-25 rounded-lg">
                {event.description ? event.description : "No description"}
            </p>

            <div className="bg-gray-800">
                <p>Invite Link</p>
                <p>
                    Share this link to your friends or guests so they can RSVP
                    without creating an account!!
                </p>
                <form action={handleInviteLink}>
                    <button type="submit">Generate Link</button>
                </form>
            </div>
        </main>
    );
}
