"use client";
import { useEffect, useState } from "react";
import { UserAuth } from "../context/userAuth";

const UserAuthProvider = ({ children }) => {
  const [userAuth, setUserAuth] = useState();
  const [loading, setLoading] = useState();

  useEffect(() => {
    setLoading(true);
    // Fetch user data
    setUserAuth({
      name: "John Doe",
      email: "",
    });
    setLoading(false);
  }, []);

  return (
    <UserAuth.Provider value={{ userAuth, loading }}>
      {children}
    </UserAuth.Provider>
  );
};

export default UserAuthProvider;
