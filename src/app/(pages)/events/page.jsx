"use client";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Loading from "@/components/Loading";
import ShowContent from "../../../components/ShowContent";
import { usePathname } from "next/navigation";
import Head from "next/head";

const Event = () => {
  const pathName = usePathname();
  //   console.log(pathName);
  const contents = useQuery({
    queryKey: ["contents", pathName],
    queryFn: async () => {
      const response = await axios.get("/api/contents");
      return response.data;
    },
  });

  //   console.log(contents.data);

  if (contents.isLoading) return <Loading />;

  return (
    <>
      <Head>
        <title>Blogs - Spark</title>
        <meta
          name="description"
          content="Read blogs shared by others. Share your own blog to inspire others. In this page you will find blogs shared by students of the department of Electrical and Electronic Engineering, University of Rajshahi. Rajshahi, Bangladesh."
          key="desc"
        />
      </Head>
      <ShowContent contents={contents.data} />
    </>
  );
};

export default Event;
