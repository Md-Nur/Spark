"use client";
import { useEffect, useState } from "react";
import { UserAuth } from "../context/userAuth";
import axios from "axios";
import { toast } from "react-toastify";

const UserAuthProvider = ({ children }) => {
  const [userAuth, setUserAuth] = useState();
  const [loading, setLoading] = useState();

  useEffect(() => {
    setLoading(true);
    // Fetch user data
    axios
      .get("/api/jwt")
      .then((res) => {
        // console.log(res.data);
        setUserAuth(res.data);
      })
      .catch((err) => {
        setUserAuth(null);
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <UserAuth.Provider value={{ userAuth, loading, setUserAuth, setLoading }}>
      {children}
    </UserAuth.Provider>
  );
};

export default UserAuthProvider;
