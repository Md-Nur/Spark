"use client";
import { useUserAuth } from "@/context/userAuth";
import Link from "next/link";
import { MdMenu } from "react-icons/md";
import LogoutBtn from "./LogoutBtn";

const NavRoutes = () => {
  const { userAuth } = useUserAuth();
  return (
    <>
      <li>
        <Link href="/results">Results</Link>
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
        {userAuth && (
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <div className="w-10 rounded-full">
                <img alt={userAuth.name} src={userAuth.imgUrl} />
              </div>
            </div>
            <ul
              tabIndex={0}
              className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52"
            >
              <li>
                <a className="justify-between">Profile</a>
              </li>
              {userAuth.role === "Admin" && (
                <li>
                  <Link href="/admin">Admin</Link>
                </li>
              )}
              <li>
                <LogoutBtn />
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
