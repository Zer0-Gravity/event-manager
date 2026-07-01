import Link from "next/link";

export default function DashboardPage() {
    return (
        <main className="w-full">
            <header className="flex justify-between">
                <div>
                    <h1 className="font-bold text-2xl">Your events</h1>
                    <p className="text-sm text-gray-500">
                        Track attendee response and manage invite links
                    </p>
                </div>
                <button className="h-10 p-1 bg-white font-semibold rounded-lg text-black">
                    <Link href="/events/new">Create Event</Link>
                </button>
            </header>

            {/* Event List Here */}
        </main>
    );
}
