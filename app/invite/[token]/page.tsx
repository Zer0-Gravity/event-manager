import InviteForm from "@/src/component/Invite/InviteForm";
import prisma from "@/src/lib/prisma";
import { format } from "date-fns";
import { Calendar, MapPin } from "lucide-react";
import { notFound } from "next/navigation";

export default async function InvitePage({
    params,
    searchParams,
}: {
    params: Promise<{ token: string }>;
    searchParams: Promise<{ submitted?: boolean }>;
}) {
    const { token } = await params;
    const query = await searchParams;

    //get data access on event invite
    const overview = await prisma.eventInvite.findFirst({
        where: { token },
        include: {
            event: {
                select: {
                    title: true,
                    location: true,
                    eventDate: true,
                    description: true,
                },
            },
        },
    });

    if (!overview) {
        notFound();
    }

    return (
        <main className="w-full h-full sm:max-w-150 mx-auto space-y-5 p-2">
            <header className="text-sm space-y-2">
                <h1 className="text-2xl font-semibold">Attendance</h1>
                <p>{`Event : ${overview.event.title}`}</p>
                <div className="flex gap-3 items-center">
                    <MapPin size={18} /> <span>{overview.event.location}</span>
                </div>
                <div className="flex gap-3 items-center">
                    <Calendar size={18} />{" "}
                    <span>{format(overview.event.eventDate, "PPPP")}</span>
                </div>
            </header>
            <div className="p-2 border border-[#222222] rounded-lg">
                <div className="bg-[#161616] p-2 rounded-sm text-sm mb-5">
                    <span>Submit your correct information!</span>
                </div>
                <InviteForm token={token} submitted={!!query.submitted} />
            </div>
        </main>
    );
}
