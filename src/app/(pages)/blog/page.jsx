"use client";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Loading from "@/components/Loading";
import ShowContent from "../../../components/ShowContent";
import { usePathname } from "next/navigation";

const Blog = () => {
  const path = usePathname();
  const contents = useQuery({
    queryKey: ["contents", path],
    queryFn: async () => {
      const response = await axios.get("/api/contents?type=blog");
      return response.data;
    },
  });

  if (contents.isLoading) return <Loading />;

  return <ShowContent contents={contents.data} />;
};

export default Blog;
