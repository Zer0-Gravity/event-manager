"use server";

import { Badge } from "@/components/ui/badge";
import CopyButton from "@/src/component/utils/CopyButton";
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

    //get invite link alongside the web url
    const inviteUrl = event.eventInvite?.token
        ? `${process.env.NEXT_PUBLIC_URL ?? ""}/invite/${event.eventInvite.token}`
        : null;

    return (
        <main className="w-full p-2 space-y-5">
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
                <div className="flex flex-col sm:flex-row gap-4 text-sm sm:items-center">
                    <div className="flex gap-2">
                        <Calendar size={18} />
                        <p>{format(event.eventDate, "PPPP")}</p>
                    </div>
                    <Dot className="hidden sm:block" />
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

            <div className="border border-[#222222] p-3 rounded-lg space-y-3">
                <div>
                    <h1 className="text-lg font-bold">Invite Link</h1>
                    <p className="text-sm">
                        Share this link to your friends or guests so they can
                        RSVP without creating an account!!
                    </p>
                </div>

                <div className="border border-[#222222] bg-[#101010] min-w-0 h-auto rounded-md p-2 text-sm">
                    {inviteUrl ? (
                        <p className="truncate">{inviteUrl}</p>
                    ) : (
                        <p className="truncate">
                            No invite link generated, please generated an invite
                            link below
                        </p>
                    )}
                </div>
                <form
                    action={handleInviteLink}
                    className="flex justify-between"
                >
                    <button
                        type="submit"
                        className="bg-white text-black p-2 rounded-lg text-sm"
                    >
                        Generate Link
                    </button>

                    {inviteUrl && <CopyButton url={inviteUrl} />}
                </form>
            </div>
        </main>
    );
}
