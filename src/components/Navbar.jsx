"use client";
import { useUserAuth } from "@/context/userAuth";
import Link from "next/link";
import { MdMenu } from "react-icons/md";
import LogoutBtn from "./LogoutBtn";
import Image from "next/image";
import { FaMoon, FaSun } from "react-icons/fa";
import { useEffect, useState } from "react";
import Loading from "./Loading";

const NavRoutes = () => {
  const { userAuth } = useUserAuth();
  return (
    <>
      <li>
        <Link href="/">Home</Link>
      </li>
      <li>
        <Link href="/results">{userAuth ? "Results" : "Student Info"}</Link>
      </li>
      {userAuth ? (
        <li>
          <LogoutBtn />
        </li>
      ) : (
        <li>
          <Link href="/login">Login</Link>
        </li>
      )}
      {userAuth && userAuth.role === "Admin" && (
        <li>
          <Link href="/admin">Admin</Link>
        </li>
      )}
    </>
  );
};

const Navbar = () => {
  const { userAuth, loading } = useUserAuth();

  const [theme, setTheme] = useState(null);

  useEffect(() => {
    const localTheme = localStorage.getItem("theme");

    if (localTheme && !theme) setTheme(localTheme);
    else if (!localTheme && !theme) setTheme("corporate");
    else if (theme) localStorage.setItem("theme", theme);

    const html = document.querySelector("html");
    html.attributes["data-theme"].value = theme;
  }, [theme]);

  if (!theme || loading) return <Loading />;

  return (
    <div className="navbar bg-base-300 sticky top-0 z-10">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <MdMenu />
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
          >
            <NavRoutes />
          </ul>
        </div>
        <Link href="/" className="btn btn-ghost text-xl">
          Spark
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
            onChange={(e) => setTheme(e.target.checked ? "dark" : "corporate")}
          />
          <FaMoon />
        </label>
        <div className="dropdown dropdown-end">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost btn-circle avatar"
          >
            <div className="w-10 rounded-full">
              <Image
                alt={userAuth?.name || "Avatar"}
                src={
                  userAuth?.imgUrl ||
                  "https://plus.unsplash.com/premium_photo-1711987238385-fc2a6736fdb4"
                }
                width={40}
                height={40}
                className="w-auto h-auto"
              />
            </div>
          </div>
          <ul
            tabIndex={0}
            className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52"
          >
            {userAuth ? (
              <>
                <li>
                  <Link
                    href={`/student/${userAuth._id}`}
                    className="justify-between"
                  >
                    Profile
                  </Link>
                </li>
                {userAuth?.role === "Admin" && (
                  <li>
                    <Link href="/admin">Admin</Link>
                  </li>
                )}
                <li>
                  <LogoutBtn />
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link href="/login">Login</Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
