"use client"
import {  useUserAuth } from "@/context/userAuth";
import Link from "next/link";
import { MdMenu } from "react-icons/md";

const NavRoutes = () => {
  return (
    <>
      <li>
        <Link href="/admin">Admin</Link>
      </li>
      <li>
        <Link href="/results">Results</Link>
      </li>
    </>
  );
};

const Navbar = () => {
  const { userAuth } = useUserAuth();
  // const {userAuth} = useContext(UserAuth)
  // console.log(useUserAuth);

  return (
    <div className="navbar bg-base-100">
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
        <a className="btn">{userAuth?.name}</a>
      </div>
    </div>
  );
};

export default Navbar;
