"use client";
import { useUserAuth } from "@/context/userAuth";
import Link from "next/link";
import { MdMenu } from "react-icons/md";
import Image from "next/image";
import { FaMoon, FaSun } from "react-icons/fa";
import { useEffect, useState } from "react";
import Loading from "../Loading";
import logoDark from "@/pic/sparknight.png";
import logoLight from "@/pic/dayspark.png";
import NavRoutes from "./NavRoutes";
import ProfileRoutes from "./ProfileRoutes";

const Navbar = () => {
  const { userAuth, loading } = useUserAuth();

  const [theme, setTheme] = useState(null);

  useEffect(() => {
    const localTheme = localStorage.getItem("theme");

    if (localTheme && !theme) setTheme(localTheme);
    else if (!localTheme && !theme) setTheme("emerald");
    else if (theme) localStorage.setItem("theme", theme);

    const html = document.querySelector("html");
    html.attributes["data-theme"].value = theme;
  }, [theme]);

  if (!theme || loading)
    return (
      <div className="h-[72px]">
        <Loading />
      </div>
    );

  return (
    <div
      className={`navbar ${
        theme === "dark" ? "bg-[#162230]" : "bg-[#7BDDCE]"
      } sticky top-0 z-10`}
    >
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <MdMenu className="w-7 h-7" />
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
          >
            <NavRoutes />
          </ul>
        </div>
        <Link href="/" className="cursor-pointer ml-3 ">
          <Image
            src={theme === "dark" ? logoDark : logoLight}
            alt="logo"
            width={100}
            height={100}
            className="h-14 w-14 object-cover rounded-full"
          />
        </Link>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          <NavRoutes />
        </ul>
      </div>
      <div className="navbar-end">
        <label className="flex cursor-pointer gap-2 items-center mx-3">
          <FaSun />
          <input
            type="checkbox"
            className="toggle"
            defaultChecked={theme === "dark"}
            onChange={(e) => setTheme(e.target.checked ? "dark" : "emerald")}
          />
          <FaMoon />
        </label>
        <div className="dropdown dropdown-end">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost btn-circle avatar"
          >
            <div className="w-14 rounded-full">
              <Image
                alt={userAuth?.name || "Avatar"}
                src={
                  userAuth?.imgUrl ||
                  "https://plus.unsplash.com/premium_photo-1711987238385-fc2a6736fdb4"
                }
                width={100}
                height={100}
                className="w-auto h-auto"
              />
            </div>
          </div>
          <ul
            tabIndex={0}
            className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52"
          >
            <ProfileRoutes />
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
