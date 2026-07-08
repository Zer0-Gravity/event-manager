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
        <div className="border border-[#222222] p-3 rounded-md">
            <h1 className="text-lg font-bold">AttendeesList</h1>

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
                    {data.map((data, i) => (
                        <TableRow key={i}>
                            <TableCell>{data.name}</TableCell>
                            <TableCell>{data.email}</TableCell>
                            <TableCell>{data.status}</TableCell>
                            <TableCell>
                                {format(data.respondedAt, "PPpp")}
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
}
