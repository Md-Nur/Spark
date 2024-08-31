"use client";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Loading from "@/components/Loading";
import Image from "next/image";
import Link from "next/link";
import ContentApproveBtn from "@/components/ActionBtn/ContentApproveBtn";

const ManageContent = () => {
  const allContent = useQuery({
    queryKey: ["allContents"],
    queryFn: async () => {
      const response = await axios.get("/api/contents?admin=true");
      return response.data;
    },
  });
  if (allContent.isLoading) return <Loading />;

  return (
    <div className="w-full">
      <h1 className="text-4xl font-bold text-center my-10">Manage Content</h1>

      <div className="overflow-x-auto w-full">
        <table className="table table-xs sm:table-sm md:table-md lg:table-lg">
          {/* head */}
          <thead>
            <tr>
              <th>Sl</th>
              <th>Thumbnail</th>
              <th>Title & Date</th>
              <th>Author</th>
              <th>View</th>
              <th>Approve</th>
            </tr>
          </thead>
          <tbody>
            {allContent.data.map((content, i) => (
              <tr key={content._id}>
                <th>{i + 1}</th>
                <td>
                  <div className="flex items-center gap-3">
                    <div className="avatar">
                      <div className="mask mask-squircle h-12 w-12">
                        <Image
                          src={content.thumbnail}
                          alt="Thumbnail"
                          width={100}
                          height={100}
                        />
                      </div>
                    </div>
                  </div>
                </td>
                <td>
                  <div className="flex flex-col">
                    <span className="font-bold">{content.title}</span>
                    <span className="">{content.createdAt.split("T")[0]}</span>
                  </div>
                </td>
                <td>{content.user.name}</td>
                <td>
                  <Link
                    href={`/content/${content._id}`}
                    className="btn btn-sm btn-primary"
                  >
                    View
                  </Link>
                </td>
                <th>
                  <ContentApproveBtn
                    contentInfo={content}
                    refetch={allContent.refetch}
                  />
                </th>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageContent;
