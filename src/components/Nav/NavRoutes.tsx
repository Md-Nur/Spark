"use client";
import { useUserAuth } from "@/context/userAuth";
import NavLink from "./NavLink";

const NavRoutes = () => {
  const { userAuth }: any = useUserAuth();
  return (
    <>
      <NavLink to="/" label="Home" />
      <NavLink to="/results" label={userAuth ? "Results" : "Student Info"} />
      <NavLink to="/study-materials" />
      <NavLink to="/blog" />
      <NavLink to="/events" />
      <NavLink to="/academics" />
      {userAuth?.role === "Admin" && <NavLink to="/admin" />}
    </>
  );
};

export default NavRoutes;
