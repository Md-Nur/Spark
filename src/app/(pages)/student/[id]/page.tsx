"use client";
import { useUserAuth } from "@/context/userAuth";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import {
  FaFacebook,
  FaLinkedin,
  FaMailBulk,
  FaPhone,
  FaTelegram,
  FaWhatsapp,
} from "react-icons/fa";
import Loading from "@/components/Loading";
// import Metadata from "@/components/Metadata";

const Student = ({ params }: { params: { id: string } }) => {
  const { userAuth }: any = useUserAuth();
  const [year, setYear] = useState();
  const [semester, setSemester] = useState();
  const student = useQuery({
    queryKey: [params.id, userAuth?._id],
    queryFn: async () => {
      const response = await axios.get(
        `/api/user/${params.id}?year=${year}&semester=${semester}`
      );
      return response.data;
    },
  });

  if (student.isLoading) return <Loading />;

  return (
    <div className="hero min-h-screen bg-base-200 w-full">
      {/* <Metadata
        seoTitle={`${student.data?.name} - Spark`}
        seoDesc={`Profile of ${student.data?.name} of the department of Electrical and Electronic Engineering, University of Rajshahi. Rajshahi, Bangladesh.`}
      /> */}
      <div className="hero-content flex-col lg:flex-row justify-around w-full md:items-start h-full py-14">
        <div className="flex flex-col justify-center gap-2 border-b-2 border-base-content md:border-b-0 w-auto p-1">
          <h1 className="text-3xl font-bold uppercase text-center md:text-left">
            {student.data?.name}
          </h1>
          <Image
            height={300}
            width={300}
            src={student.data?.imgUrl}
            alt={student.data?.name}
            className="w-72 h-72 rounded-lg shadow-2xl object-cover mx-auto md:mx-0"
          />
          <div className="overflow-x-auto w-full">
            <table className="table table-xs md:table-sm">
              <tbody>
                {["roll", "session", "homeTown", "phone", "email"].map(
                  (key) =>
                    student.data?.[key] &&
                    (userAuth || key !== "roll") && (
                      <tr key={key}>
                        <th className="capitalize">{key}</th>
                        <td>{student.data?.[key]}</td>
                      </tr>
                    )
                )}
              </tbody>
            </table>
          </div>
          <div className="flex border-t-2 border-base-content justify-center gap-1 sm:gap-2 w-full flex-wrap">
            {[
              {
                key: "facebook",
                icon: <FaFacebook className="text-3xl" />,
              },
              {
                key: "linkedin",
                icon: <FaLinkedin className="text-3xl" />,
              },
              {
                key: "email",
                icon: <FaMailBulk className="text-3xl" />,
              },
              {
                key: "phone",
                icon: <FaPhone className="text-3xl" />,
              },
              {
                key: "whatsapp",
                icon: <FaWhatsapp className="text-3xl" />,
              },
              {
                key: "telegram",
                icon: <FaTelegram className="text-3xl" />,
              },
            ].map(
              (social) =>
                student.data?.[social.key] && (
                  <a
                    key={social.key}
                    href={student.data?.[social.key]}
                    target="_blank"
                    rel="noreferrer"
                    className="btn btn-circle"
                  >
                    {social.icon}
                  </a>
                )
            )}
          </div>
          <div className="flex flex-wrap w-full justify-center items-center border-t-2 border-base-content gap-2 py-2">
            {(userAuth?._id === params.id || userAuth?.role === "Admin") && (
              <Link
                href={`/update-user/${student.data?._id}`}
                className="btn btn-warning"
              >
                Edit Student Information
              </Link>
            )}
          </div>
        </div>
        {userAuth ? (
          <div className="w-full">
            <h1 className="text-3xl font-bold mb-5 text-center md:text-left">
              RESULT
            </h1>
            <div className="flex w-full justify-evenly flex-wrap gap-2">
              <select
                defaultValue=""
                className="select select-bordered"
                onChange={(e: any) => {
                  setYear(e.target.value.split(",")[0]);
                  setSemester(e.target.value.split(",")[1]);
                }}
              >
                <option value="">Latest</option>
                <option value="1,Odd">1st Year Odd Semester</option>
                <option value="1,Even">1sr Year Even Semester</option>
                <option value="2,Odd">2nd Year Odd Semester</option>
                <option value="2,Even">2nd Year Even Semester</option>
                <option value="3,Odd">3rd Year Odd Semester</option>
                <option value="3,Even">3rd Year Even Semester</option>
                <option value="4,Odd">4th Year Odd Semester</option>
                <option value="4,Even">4th Year Even Semester</option>
              </select>
              {(userAuth?._id === params.id || userAuth?.role === "Admin") &&
                student.data?.result && (
                  <button className="btn btn-warning ml-2">Edit Result</button>
                )}
              {(userAuth?._id === params.id || userAuth?.role === "Admin") && (
                <button className="btn btn-info ml-2">Add Result</button>
              )}
            </div>
            {student.data?.result ? (
              <div className="overflow-x-auto w-72 sm:w-full mx-auto my-5">
                <table className="table table-xs md:table-sm lg:table-md xl:table-lg lg:text-base">
                  {/* head */}
                  <thead className="">
                    <tr>
                      <th>Subject Name</th>
                      <th>Code</th>
                      <th>Credit</th>
                      <th>Grade</th>
                      <th>GPA</th>
                      <th>Type</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {student.data?.result.subjects.map((subject: any) => (
                      <tr key={subject.id} className="hover">
                        <td>{subject.name}</td>
                        <td className="">{subject.code}</td>
                        <td>{subject.credit}</td>
                        <td>{subject.grade}</td>
                        <td>{subject.sgpa}</td>
                        <td className="">{subject.type}</td>
                        <td
                          className={`${
                            subject.pass ? "text-green-500" : "text-red-500"
                          }`}
                        >
                          {subject.pass ? "Pass" : "Fail"}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="text-4xl font-bold text-center my-10">
                No Result Found
              </div>
            )}
            {student.data?.result && (
              <div className="flex w-full justify-evenly border-t-2 border-base-content mt-5 mb-0 py-5 flex-wrap gap-2">
                <button className="btn btn-success">
                  SGPA:&nbsp;
                  {student.data?.result?.sgpa.toFixed(3)}
                </button>
                <button className="btn btn-success">
                  YGPA:&nbsp;
                  {student.data?.ygpa}
                </button>
                <button className="btn btn-success">
                  CGPA:&nbsp;{student.data?.cgpa}
                </button>
              </div>
            )}
            {student.data?.result &&
              (student.data?.result?.pass ? (
                student.data?.result.subjects.find(
                  (sub: any) => sub.improvement || sub.grade === "F"
                ) && (
                  <div className="flex w-full justify-between flex-wrap border-t-2 border-base-content my-5 py-5">
                    <div>
                      <h3 className="text-lg font-bold my-2 uppercase">
                        Improvements:
                      </h3>
                      <ul className="px-3">
                        {student.data?.result.subjects
                          .filter(
                            (sub: any) => sub.improvement && sub.grade !== "F"
                          )
                          .map((sub: any) => (
                            <li className="list-disc" key={sub.code}>
                              {sub.name}
                            </li>
                          ))}
                      </ul>
                    </div>
                    <div>
                      <h3 className="text-lg font-bold my-2 uppercase">
                        Credit Lost:
                      </h3>
                      <ul className="px-3">
                        {student.data?.result.subjects
                          .filter((sub: any) => sub.grade === "F")
                          .map((sub: any) => (
                            <li className="list-disc" key={sub.code}>
                              {sub.name}
                            </li>
                          ))}
                      </ul>
                    </div>
                  </div>
                )
              ) : (
                <div className="flex w-full justify-center items-center border-t-2 border-base-content gap-2 py-2">
                  <span className="text-2xl font-bold text-red-500">
                    Failed
                  </span>
                </div>
              ))}
          </div>
        ) : (
          <div className="flex justify-center items-center w-full h-full">
            <span className="text-4xl font-bold max-w-md text-center leading-loose">
              {/* কী...... স্পর্কের মেম্বার না!!! রেজাল্ট দেখার অনুমতি নাই😜 */}
              Please login to see results.
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default Student;
