"use server";

import prisma from "@/src/lib/prisma";

export async function CreateNewEvent(data: any, userId: string) {
    try {
        await prisma.event.create({ data: { ownerId: userId, ...data } });

        return { success: true, error: null };
    } catch (error) {
        console.log(error);

        return {
            success: false,
            error: "Could not create the event, please try again",
        };
    }
}
