"use client";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { usePathname } from "next/navigation";
import Loading from "@/components/Loading";
import ShowContent from "@/components/ShowContent";
import Link from "next/link";

const LatestContent = () => {
  const path = usePathname();
  const contents = useQuery({
    queryKey: ["contents", path],
    queryFn: async () => {
      const response = await axios.get("/api/contents?limit=3");
      return response.data;
    },
  });

  if (contents.isLoading) return <Loading />;

  return (
    <div className="w-full mb-20">
      <ShowContent contents={contents.data} title="Recent Activities" />
      <div className="flex w-full flex-wrap gap-5 justify-center -mt-3">
        <Link className="btn btn-success" href="/blog">
          Show All Blogs
        </Link>
        <Link className="btn btn-success" href="/events">
          Show All Events
        </Link>
      </div>
    </div>
  );
};

export default LatestContent;
