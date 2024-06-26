"use client";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Loading from "@/components/Loading";
import Link from "next/link";
import DeleteSm from "../../../components/DeleteSm";
import { useUserAuth } from "@/context/userAuth";
// import Metadata from "@/components/Metadata";

const StudyMaterials = () => {
  const { userAuth, loading } = useUserAuth();
  const sm = useQuery({
    queryKey: ["studyMaterials"],
    queryFn: async () => {
      const data = await axios.get("/api/study-materials");
      return data.data;
    },
  });
  if (sm.isLoading || loading) return <Loading />;
  if (sm.isError) return <div>{sm.error.message}</div>;

  return (
    <>
      {/* <Metadata
        seoTitle="Study Materials - Spark"
        seoDescription="Study materials of all the courses of the department of Electrical and Electronic Engineering, University of Rajshahi. Rajshahi, Bangladesh. These study materials are provided by the students of the department of EEE RU. Batch 08. SPARK-08."
      /> */}
      <section className="w-full max-w-7xl mx-auto p-1">
        <h1 className="text-4xl text-center font-bold my-10">
          Study Materails
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {sm.data.length > 0 ? (
            sm.data.map((data) => (
              <div key={data._id} className="card bg-base-200 w-auto shadow-xl">
                <div className="card-body">
                  <h2 className="card-title">{data.title}</h2>
                  <p>{data.user.name}</p>
                  <div className="card-actions justify-end">
                    <a
                      href={data.driveUrl}
                      target="_blank"
                      className="btn btn-primary"
                    >
                      View
                    </a>
                    {(data.user._id === userAuth?._id ||
                      userAuth?.role === "Admin") && (
                      <>
                        <Link
                          href={`/update-sm/${data._id}`}
                          className="btn btn-secondary"
                        >
                          Edit
                        </Link>
                        <DeleteSm id={data._id} refetch={sm.refetch} />
                      </>
                    )}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center text-2xl font-bold">
              No study materials available
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default StudyMaterials;
