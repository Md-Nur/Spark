"use client";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Loading from "@/components/Loading";
import ShowContent from "../../../components/ShowContent";
import { usePathname } from "next/navigation";

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

  return <ShowContent contents={contents.data} />;
};

export default Event;
