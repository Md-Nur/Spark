"use client";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useUserAuth } from "@/context/userAuth";
import Loading from "@/components/Loading";

const Content = ({ params }) => {
  const { userAuth } = useUserAuth();
  const content = useQuery({
    queryKey: ["content", params.id],
    queryFn: async () => {
      const response = await axios.get(`/api/contents/${params.id}`);
      return response.data;
    },
  });

  if (content.isLoading) return <Loading />;

  if (
    content.isError ||
    (!content?.data?.isApproved &&
      userAuth.role !== "Admin" &&
      userAuth._id !== content.data.userId)
  )
    return (
      <div>
        {content?.error?.message || "Your are not able to see this post"}
      </div>
    );

  return (
    <div>
      <h1 className="text-4xl font-bold text-center">{content.data.title}</h1>
      <div
        className="prose max-w-none"
        dangerouslySetInnerHTML={{ __html: content.data.content }}
      ></div>
    </div>
  );
};

export default Content;
