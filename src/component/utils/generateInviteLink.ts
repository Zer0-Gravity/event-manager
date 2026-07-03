"use server";

import { auth } from "@/src/lib/auth";
import prisma from "@/src/lib/prisma";
import { headers } from "next/headers";

export async function generateInviteLink(eventId: string) {
    const session = await auth.api.getSession({ headers: await headers() });

    //Check if the event owned by the user
    const own = prisma.event.findFirst({
        where: { id: eventId, ownerId: session?.user.id },
        select: { id: true },
    });

    if (!own) {
        throw new Error("Event not found");
    }

    //Create token using crypto and replace the "-" with empty string
    const token = crypto.randomUUID().replace(/-/g, "");

    //Update and insert the token into database
    await prisma.eventInvite.upsert({
        where: { eventId },
        create: { eventId, token },
        update: { token },
    });
}
