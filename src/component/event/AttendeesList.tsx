import { Badge } from "@/components/ui/badge";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import prisma from "@/src/lib/prisma";
import { format } from "date-fns";
import { Frown } from "lucide-react";

export default async function AttendeesList({ eventId }: { eventId: string }) {
    const data = await prisma.eventRsvp.findMany({
        where: { eventId },
        orderBy: { respondedAt: "desc" },
        select: {
            id: true,
            name: true,
            email: true,
            status: true,
            respondedAt: true,
        },
    });

    return (
        <div className="border border-[#222222] p-3 rounded-md space-y-4">
            <h1 className="text-lg font-bold">Attendees List</h1>

            {data.length === 0 ? (
                <div className="w-full h-20 flex items-center justify-center gap-5 border border-[#222222] rounded-lg py-5">
                    <Frown size={40} />
                    <div className="text-sm">
                        <h1>Your guest list is empty</h1>
                        <p>
                            Share your event invite link to start gathering
                            responses.
                        </p>
                    </div>
                </div>
            ) : (
                <Table>
                    <TableHeader>
                        <TableRow className="rounded-lg">
                            <TableHead>Name</TableHead>
                            <TableHead>Email</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Updated</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {data.map((d) => (
                            <TableRow key={d.id}>
                                <TableCell>{d.name}</TableCell>
                                <TableCell>{d.email}</TableCell>
                                <TableCell>
                                    {d.status === "not_going"
                                        ? "not going"
                                        : d.status}
                                </TableCell>
                                <TableCell>
                                    {format(d.respondedAt, "PPPP")}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            )}
        </div>
    );
}
