"use client";
import Link from "next/link";
import { NavLink } from "./NavLink";
import DropdownAccount from "../account/DropdownAccount";

export default function Navbar() {
    return (
        <div className="p-5 flex justify-between">
            <Link href={"/"}>Event Planner</Link>

            <nav className="flex items-center gap-4">
                <NavLink href="dashboard">Dashboard</NavLink>
                <DropdownAccount />
            </nav>
        </div>
    );
}
