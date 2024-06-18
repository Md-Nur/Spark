"use client";
import { createContext, useContext } from "react";

const UserAuth = createContext({
  userAuth: {},
  setUserAuth: (userAuth: any) => {},
  loading: true,
  setLoading: (loading: boolean) => {},
});

const useUserAuth = () => {
  const context = useContext(UserAuth);
  if (!context) {
    return "useUserAuth must be used within a UserAuthProvider";
  }
  return context;
};

export { UserAuth, useUserAuth };
