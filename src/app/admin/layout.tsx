import Link from "next/link";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="drawer lg:drawer-open">
      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col items-center justify-center">
        {/* Page content here */}
        {children}
        <label
          htmlFor="my-drawer-2"
          className="btn btn-primary drawer-button lg:hidden"
        >
          Open Menu
        </label>
      </div>
      <div className="drawer-side">
        <label
          htmlFor="my-drawer-2"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <ul className="menu p-4 w-auto min-h-full bg-base-300 text-base-content">
          {/* Sidebar content here */}
          <li className="btn btn-neutral m-1 btn-sm">
            <Link href="/admin/add-result">Add Result</Link>
          </li>
          <li className="btn btn-neutral m-1 btn-sm">
            <Link href="/admin/add-sub">Add Subject</Link>
          </li>
        </ul>
      </div>
    </div>
  );
}
