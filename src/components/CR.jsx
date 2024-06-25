"use client";
import { hall } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import Loading from "@/components/Loading";
import { usePathname } from "next/navigation";

const CR = () => {
  const pathname = usePathname();
  const crs = useQuery({
    queryKey: ["crs", pathname],
    queryFn: async () => {
      const response = await axios.get(`/api/cr`);
      return response.data;
    },
  });
  if (crs.isLoading) return <Loading />;
  return (
    <section className="w-full my-10">
      <h1 className="text-4xl text-center font-bold my-20">
        Class Representative
      </h1>
      <div className="flex flex-wrap gap-4 justify-evenly w-full">
        {crs.data?.map((cr) => (
          <Link
            href={`/student/${cr._id}`}
            key={cr._id}
            className="card bg-base-300 w-full px-2 md:w-96 shadow-xl"
          >
            <figure>
              <Image
                src={cr.imgUrl}
                alt={cr.name}
                height={300}
                width={300}
                className="rounded-t-lg w-full h-72 object-cover object-center"
              />
            </figure>
            <div className="card-body">
              <h2 className="card-title">
                {cr.name} <div className="badge badge-secondary">CR</div>
              </h2>
              <div className="card-actions justify-end">
                <div className="badge badge-outline">{cr.homeTown}</div>
                <div className="badge badge-outline">{hall[cr.hallCode]}</div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default CR;

{
  /* <div
        className="hero bg-fixed bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url(https://i.ibb.co/58zCFPr/trophos.jpg)",
        }}
      >
       
        <div className="hero-content flex-col md:flex-row-reverse justify-evenly">
          <Image
            src={crPic}
            alt="CR"
            width={500}
            height={500}
            className="rounded-lg shadow-lg md:mr-10 md:mb-0 mb-10"
          />
          <div className="hero-overlay bg-opacity-85 p-5 rounded-xl w-full md:w-1/2 text-white">
            <h1 className="text-3xl font-bold text-white">
              Powering Up Batch 8: Meet the Spark Plugs!
            </h1>
            <p className="py-6">
              Our batch is fueled by the dedication of our very own Class
              Representatives (CRs),<strong>Tousif Iqti</strong> from Rangpur
              and <strong>Muhammad Nur</strong> from Dhaka. These two dynamos
              are like a well-wired circuit – perfectly in sync and always
              reliable. You can count on them to keep the current flowing,
              whether it&apos;s delivering important announcements or sparking
              solutions to any academic hurdles. Their friendship ensures a
              positive charge runs through the batch, and their commitment to
              duty is unwavering. So, if you have a question or need a classmate
              connection, look no further than our trusty CR duo!
            </p>
          </div>
        </div>
</div> */
}
