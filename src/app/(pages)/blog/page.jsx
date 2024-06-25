"use client";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Loading from "@/components/Loading";
import ShowContent from "../../../components/ShowContent";
import { usePathname } from "next/navigation";
import Metadata from "@/components/Metadata";

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

  return (
    <>
      <Metadata
        seoTitle="Blogs - Spark"
        seoDescription="Read blogs shared by others. Share your own blog to inspire others. In this page you will find blogs shared by students of the department of Electrical and Electronic Engineering, University of Rajshahi. Rajshahi, Bangladesh."
      />

      <ShowContent contents={contents.data} title="Blogs" />
    </>
  );
};

export default Blog;
