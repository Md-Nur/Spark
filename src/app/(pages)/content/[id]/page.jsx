"use client";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useUserAuth } from "@/context/userAuth";
import Loading from "@/components/Loading";
import "../style.css";
import Image from "next/image";
import Link from "next/link";
import DeleteContentBtn from "@/components/DeleteContentBtn";
// import Metadata from "@/components/Metadata";

const Content = ({ params }) => {
  const { userAuth, loading } = useUserAuth();
  const content = useQuery({
    queryKey: ["content", params.id],
    queryFn: async () => {
      const response = await axios.get(`/api/contents/${params.id}`);
      return response.data;
    },
  });

  if (content.isLoading || loading) return <Loading />;

  if (
    content.isError ||
    (!content?.data?.isApproved &&
      userAuth?.role !== "Admin" &&
      userAuth?._id !== content.data.userId)
  )
    return (
      <div>
        {content?.error?.message || "Your are not able to see this post"}
      </div>
    );

  if (!content.data) return <div>Post not found</div>;

  return (
    <>
      {/* <Metadata
        seoTitle={content.data.title}
        seoDescription={
          content.data.title + " - " + content.data.tags.join(", ")
        }
      /> */}
      <section className="py-20 px-2">
        <h1 className="text-xl md:text-4xl font-bold text-center my-10">
          {content.data.title}
        </h1>
        <div className="md:p-5 max-w-7xl mx-auto">
          <figure>
            <Image
              src={content.data.thumbnail}
              alt={content.data.title}
              width={1700}
              height={1000}
              className="object-cover w-full max-h-[calc(100vh-250px)] rounded-lg"
            />
          </figure>
          <div className="flex rounded-lg p-5 mt-5 bg-base-200 justify-center md:justify-between items-center flex-wrap gap-3">
            <div className="flex items-center gap-2">
              <Link href={`/student/${content.data.user._id}`}>
                <Image
                  src={content.data.user?.imgUrl}
                  alt={content.data.user?.name}
                  width={100}
                  height={100}
                  className="rounded-full h-16 w-16 object-cover"
                />
              </Link>
              <div>
                <Link
                  href={`/student/${content.data.user._id}`}
                  className="font-semibold"
                >
                  {content.data.user.name}
                </Link>
                <p>Created At: {content.data.createdAt.split("T")[0]}</p>
                <p>Last Update: {content.data.updatedAt.split("T")[0]}</p>
              </div>
            </div>
            <div className="flex flex-col gap-2 items-center flex-wrap">
              <div className="badge badge-primary">
                Type: {content.data.type}
              </div>
              <div className="flex gap-3 items-center flex-wrap justify-center">
                <span className="font-semibold badge-neutral badge">
                  Tags:{" "}
                </span>
                {content.data.tags.map((tag) => (
                  <div key={tag} className="badge badge-secondary">
                    {tag}
                  </div>
                ))}
              </div>
            </div>
            {(userAuth?._id === content.data.userId ||
              userAuth?.role === "Admin") && (
              <div className="flex gap-2">
                <Link
                  href={`/edit-content/${params.id}`}
                  className="btn btn-info"
                >
                  Edit
                </Link>
                <DeleteContentBtn
                  id={content.data._id}
                  type={content.data.type}
                />
              </div>
            )}
          </div>
          <div
            className="custom-html-content rounded-lg p-5 mt-5 bg-base-200"
            dangerouslySetInnerHTML={{ __html: content.data.content }}
          ></div>
        </div>
      </section>
    </>
  );
};

export default Content;
