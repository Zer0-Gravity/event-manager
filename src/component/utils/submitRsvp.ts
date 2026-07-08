"use server";

import prisma from "@/src/lib/prisma";
import { redirect } from "next/navigation";

export async function submitRsvpInvite(token: string, data: any) {
    const input = data;

    const invite = await prisma.eventInvite.findFirst({
        where: { token },
        select: { id: true, event: { select: { id: true } } },
    });

    if (!invite) {
        throw new Error("Something wrong");
    }

    const eventId = invite.event.id;
    const emailNormalized = input.email.toLowerCase();

    await prisma.eventRsvp.upsert({
        where: { eventId_emailNormalized: { eventId, emailNormalized } },

        create: {
            eventId,
            inviteId: invite.id,
            name: input.name,
            email: input.email,
            emailNormalized,
            status: input.status,
        },

        update: {
            name: input.name,
            status: input.status,
            respondedAt: new Date(),
        },
    });

    redirect(`/invite/${token}?submitted=1`);
}
