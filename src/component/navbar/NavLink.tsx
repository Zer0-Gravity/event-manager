"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { ReactNode } from "react";

interface NavlinkProps {
    href: string;
    children: ReactNode;
}

export function NavLink({ href, children }: NavlinkProps) {
    const pathname = usePathname();

    //Check if the current url matches with link destination
    const isActive = pathname === href;

    return (
        <Link
            href={`/${href}`}
            className={`${isActive ? "border-b-2" : "border-0"}`}
        >
            {children}
        </Link>
    );
}
