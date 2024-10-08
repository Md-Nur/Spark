"use client";
import { useUserAuth } from "@/context/userAuth";
import Link from "next/link";
import Loading from "@/components/Loading";
import { useRouter } from "next/navigation";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { userAuth, loading }: any = useUserAuth();
  const router = useRouter();
  if (loading) return <Loading />;
  else if (userAuth?.role !== "Admin") {
    router.push("/login");
    return (
      <div className="flex items-center justify-center">
        <h1 className="text-2xl font-bold text-center">
          You are not authorized to view this page
        </h1>
      </div>
    );
  }
  return (
    <div className="drawer lg:drawer-open">
      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col items-center justify-center ">
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
        <ul className="menu p-4 w-auto min-h-full bg-base-200 text-neutral-content justify-center">
          {/* Sidebar content here */}
          <li className="my-2">
            <Link className="btn btn-outline btn-neutral" href="/admin">
              Manage User
            </Link>
          </li>

          <li className="my-2">
            <Link className="btn btn-outline btn-neutral" href="/admin/add-sub">
              Add Subject
            </Link>
          </li>
          <li className="my-2">
            <Link
              className="btn btn-outline btn-neutral"
              href="/admin/manage-content"
            >
              Manage Content
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}
