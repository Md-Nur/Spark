"use client";
import axios from "axios";
import { useUserAuth } from "@/context/userAuth";
import { toast } from "react-toastify";

const LogoutBtn = () => {
  const { setUserAuth, setLoading } = useUserAuth();
  return (
    <button
      onClick={() => {
        setLoading(true);
        axios
          .get("/api/logout")
          .then(() => {
            setUserAuth(null);
          })
          .catch((err) => {
            toast.error(err.message);
          })
          .finally(() => {
            setLoading(false);
          });
      }}
    >
      Logout
    </button>
  );
};

export default LogoutBtn;
