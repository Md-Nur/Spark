"use client";
import { useUserAuth } from "@/context/userAuth";
import LogoutBtn from "../LogoutBtn";
import NavLink from "./NavLink";

const ProfileRoutes = () => {
  const { userAuth }: any = useUserAuth();
  return userAuth ? (
    <>
      <NavLink to="/add-sm" label="Add Study Material" />
      <NavLink to="/add-content" label="Add Blog/Event" />
      <NavLink to={`/student/${userAuth._id}`} label="Profile" />
      {userAuth?.role === "Admin" && <NavLink to="/admin" />}
      <li>
        <LogoutBtn />
      </li>
    </>
  ) : (
    <NavLink to="/login" />
  );
};

export default ProfileRoutes;
