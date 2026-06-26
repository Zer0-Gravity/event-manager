import Link from "next/link";
import { NavLink } from "./NavLink";

export default function Navbar() {
    return (
        <div className="p-5 flex justify-between">
            <Link href={"/"}>Event Planner</Link>

            <nav>
                <NavLink href="/dashboard">Dashboard</NavLink>
            </nav>
        </div>
    );
}
