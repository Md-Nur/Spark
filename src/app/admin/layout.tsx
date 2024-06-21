"use client";
import { useUserAuth } from "@/context/userAuth";
import Link from "next/link";
import Loading from "@/components/Loading";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { userAuth, loading }: any = useUserAuth();
  if (loading) return <Loading />;
  else if (userAuth?.role !== "Admin") {
    return (
      <div className="flex items-center justify-center h-screen">
        <h1 className="text-2xl font-bold text-center">
          You are not authorized to view this page
        </h1>
      </div>
    );
  }
  return (
    <div className="drawer lg:drawer-open">
      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col items-center justify-center">
        {/* Page content here */}
        <label
          htmlFor="my-drawer-2"
          className="btn btn-primary drawer-button btn-sm lg:hidden"
        >
          Open Slider
        </label>
        {children}
      </div>
      <div className="drawer-side">
        <label
          htmlFor="my-drawer-2"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <ul className="menu p-4 w-auto min-h-full bg-base-300 text-base-content">
          {/* Sidebar content here */}
          <li className="my-2">
            <Link className="btn btn-neutral btn-sm" href="/admin">
              Manage User
            </Link>
          </li>
          <li className="my-2">
            <Link className="btn btn-neutral btn-sm" href="/admin/add-result">
              Add Result
            </Link>
          </li>
          <li className="my-2">
            <Link className="btn btn-neutral btn-sm" href="/admin/add-sub">
              Add Subject
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}
