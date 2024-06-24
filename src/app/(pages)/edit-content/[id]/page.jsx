"use client";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Loading from "@/components/Loading";
import Content from "@/components/Content";

const EditContent = ({ params }) => {
  const content = useQuery({
    queryKey: ["content", params.id],
    queryFn: async () => {
      const response = await axios.get(`/api/contents/${params.id}`);
      return response.data;
    },
  });
  if (content.isLoading) return <Loading />;
  return <Content postData={content.data} />;
};

export default EditContent;
