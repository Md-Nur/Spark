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

const Student = ({ params }) => {
  const { userAuth } = useUserAuth();
  const [year, setYear] = useState();
  const [semester, setSemester] = useState();
  const student = useQuery({
    queryKey: ["student", params.id, year, semester, userAuth],
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
          <div className="overflow-x-auto">
            <table className="table table-xs md:table-sm">
              <tbody>
                <tr>
                  <th className="hover">Roll</th>
                  <td>{student.data?.roll}</td>
                </tr>
                <tr className="hover">
                  <th>Session</th>
                  <td>{student.data?.session}</td>
                </tr>
                {student.data?.homeTown && (
                  <tr>
                    <th>Home-Town</th>
                    <td>{student.data?.homeTown}</td>
                  </tr>
                )}
                {student.data?.phone && (
                  <tr>
                    <th>Phone</th>
                    <td>{student.data?.phone}</td>
                  </tr>
                )}
                {student.data?.email && (
                  <tr>
                    <th>Email</th>
                    <td>{student.data?.email}</td>
                  </tr>
                )}
                <tr>
                  <th>Allotted Hall</th>
                  <td>{student.data?.hall}</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="flex border-t-2 border-base-content justify-center gap-2 w-full">
            {student.data?.facebook && (
              <a
                href={student.data?.facebook}
                target="_blank"
                rel="noreferrer"
                className="btn btn-circle"
              >
                <FaFacebook className="text-3xl" />
              </a>
            )}
            {student.data?.linkedin && (
              <a
                href={student.data?.linkedin}
                target="_blank"
                rel="noreferrer"
                className="btn"
              >
                <FaLinkedin className="text-3xl" />
              </a>
            )}
            {student.data?.email && (
              <div className="tooltip" data-tip={student.data.email}>
                <a
                  href={`mailto:${student.data.email}`}
                  target="_blank"
                  rel="noreferrer"
                  className="btn btn-circle"
                >
                  <FaMailBulk className="text-3xl" />
                </a>
              </div>
            )}
            {student.data?.phone && (
              <div className="tooltip" data-tip={student.data.phone}>
                <a
                  href={`tel:${student.data.phone}`}
                  target="_blank"
                  rel="noreferrer"
                  className="btn btn-circle"
                >
                  <FaPhone className="text-3xl" />
                </a>
              </div>
            )}
            {student.data?.whatsapp && (
              <div className="tooltip" data-tip={student.data.whatsapp}>
                <a
                  href={`https://wa.me/${student.data.whatsapp}`}
                  target="_blank"
                  rel="noreferrer"
                  className="btn btn-circle"
                >
                  <FaWhatsapp className="text-3xl" />
                </a>
              </div>
            )}
            {student.data?.telegram && (
              <div className="tooltip" data-tip={student.data.telegram}>
                <a
                  href={`https://t.me/${student.data.telegram}`}
                  target="_blank"
                  rel="noreferrer"
                  className="btn btn-circle"
                >
                  <FaTelegram className="text-3xl" />
                </a>
              </div>
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
          <div className="border-t-2 border-base-content md:border-t-0 w-full">
            <h1 className="text-3xl font-bold mb-5 text-center md:text-left">
              RESULT
            </h1>
            <div className="flex w-full justify-evenly flex-wrap gap-2">
              <select
                defaultValue=""
                className="select select-bordered"
                onChange={(e) => {
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
                      <th className="">Code</th>
                      <th>Credit</th>
                      <th>Grade</th>
                      <th>GPA</th>
                      <th className="">Type</th>
                      <th className="">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {student.data?.result.subjects.map((subject) => (
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
                <button className="btn btn-neutral">
                  SGPA:
                  {student.data?.result?.sgpa.toFixed(3)}
                </button>
                <button className="btn btn-neutral">
                  YGPA
                  {student.data?.ygpa}
                </button>
                <button className="btn btn-neutral">
                  CGPA{student.data?.cgpa}
                </button>
              </div>
            )}
            {student.data?.result &&
              (student.data?.result?.pass ? (
                student.data?.result.subjects.find(
                  (sub) => sub.improvement || sub.grade === "F"
                ) && (
                  <div className="flex w-full justify-between flex-wrap border-t-2 border-base-content my-5 py-5">
                    <div>
                      <h3 className="text-lg font-bold my-2 uppercase">
                        Improvements:
                      </h3>
                      <ul className="px-3">
                        {student.data?.result.subjects
                          .filter((sub) => sub.improvement && sub.grade !== "F")
                          .map((sub) => (
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
                          .filter((sub) => sub.grade === "F")
                          .map((sub) => (
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
              কী...... স্পর্কের মেম্বার না!!! রেজাল্ট দেখার অনুমতি নাই😜
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default Student;
