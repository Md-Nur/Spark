"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

const NavLink = ({ to, label }: { to: string; label?: string }) => {
  const pathname = usePathname();

  return (
    <li>
      <Link
        className={`capitalize ${
          pathname === to ? "active" : ""
        }`}
        href={to}
      >
        {label || to.split("/")[1]}
      </Link>
    </li>
  );
};

export default NavLink;
