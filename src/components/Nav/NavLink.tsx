"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const NavLink = ({ to, label }: { to: string; label?: string }) => {
  const pathname = usePathname();

  return (
    <li>
      <Link
        className={`capitalize mx-1 hover:border-b-2 border-base-content ${
          pathname === to ? "border-b-2" : ""
        }`}
        href={to}
      >
        {label || to.split("/")[1]}
      </Link>
    </li>
  );
};

export default NavLink;
