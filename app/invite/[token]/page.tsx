import InviteForm from "@/src/component/Invite/InviteForm";
import prisma from "@/src/lib/prisma";
import { notFound } from "next/navigation";

export default async function InvitePage({
    params,
}: {
    params: Promise<{ token: string }>;
}) {
    const { token } = await params;

    const overview = await prisma.eventInvite.findFirst({
        where: { token },
    });

    if (!overview) {
        notFound();
    }

    return (
        <main className="w-full h-full sm:max-w-225 mx-auto space-y-5">
            <header>
                <h1 className="text-2xl font-semibold">Submit Attendace</h1>
            </header>
            <InviteForm />
        </main>
    );
}
