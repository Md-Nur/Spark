"use client";
import { useUserAuth } from "@/context/userAuth";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";

const Student = ({ params }) => {
  const { userAuth } = useUserAuth();
  const [year, setYear] = useState();
  const [semester, setSemester] = useState();
  const student = useQuery({
    queryKey: ["student", params.id, year, semester],
    queryFn: async () => {
      const response = await axios.get(
        `/api/user/${params.id}?year=${year}&semester=${semester}`
      );
      return response.data;
    },
  });

  return (
    <div className="hero min-h-screen bg-base-200 w-full">
      <div className="hero-content flex-col lg:flex-row justify-around w-full items-start h-full py-14">
        <div className="flex flex-col justify-center gap-2 border-b-2 border-base-content md:border-b-0">
          <h1 className="text-3xl font-bold uppercase">{student.data?.name}</h1>
          <img
            src={student.data?.imgUrl}
            alt={student.data?.name}
            className="w-72 h-72 rounded-lg shadow-2xl object-cover"
          />
          <div className="overflow-x-auto">
            <table className="table">
              <tbody>
                {/* row 1 */}
                <tr>
                  <th className="hover">Roll</th>
                  <td>{student.data?.roll}</td>
                </tr>
                {/* row 2 */}
                <tr className="hover">
                  <th>Session</th>
                  <td>{student.data?.session}</td>
                </tr>
                {/* row 3 */}
                <tr>
                  <th>Home-Town</th>
                  <td>{student.data?.homeTown}</td>
                </tr>
                <tr>
                  <th>Allotted Hall</th>
                  <td>{student.data?.hall}</td>
                </tr>
                {userAuth && (
                  <>
                    <tr>
                      <th>SGPA</th>
                      <td>{student.data?.result?.sgpa.toFixed(3)}</td>
                    </tr>
                    <tr>
                      <th>YGPA</th>
                      <td>{student.data?.ygpa}</td>
                    </tr>
                    <tr>
                      <th>CGPA</th>
                      <td>{student.data?.cgpa}</td>
                    </tr>
                  </>
                )}
              </tbody>
            </table>
          </div>

          <div className="flex flex-wrap w-full justify-center items-center border-t-2 border-base-content gap-2 py-2">
            {(userAuth?._id === params.id || userAuth?.role === "Admin") && (
              <button className="btn btn-warning">
                Edit Student Information
              </button>
            )}
          </div>
        </div>
        {userAuth ? (
          <div className="border-t-2 border-base-content md:border-t-0">
            <h1 className="text-3xl font-bold mb-5">RESULT</h1>
            <div className="flex w-full justify-center">
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
              {(userAuth?._id === params.id || userAuth?.role === "Admin") && (
                <>
                  <button className="btn btn-warning ml-2">Edit Result</button>
                  <button className="btn btn-info ml-2">Add Result</button>
                </>
              )}
            </div>
            <div className="overflow-x-auto">
              <table className="table text-base">
                {/* head */}
                <thead className="text-base">
                  <tr>
                    <th>Subject Name</th>
                    <th className="hidden lg:table-cell">Code</th>
                    <th>Credit</th>
                    <th>Grade</th>
                    <th>GPA</th>
                    <th className="hidden sm:table-cell">Type</th>
                    <th className="hidden md:table-cell">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {student.data?.result ? (
                    student.data?.result.subjects.map((subject) => (
                      <tr key={subject.id} className="hover">
                        <td>{subject.name}</td>
                        <td className="hidden lg:table-cell">{subject.code}</td>
                        <td>{subject.credit}</td>
                        <td>{subject.grade}</td>
                        <td>{subject.sgpa}</td>
                        <td className="hidden sm:table-cell">{subject.type}</td>
                        <td
                          className={`hidden md:table-cell ${
                            subject.pass ? "text-green-500" : "text-red-500"
                          }`}
                        >
                          {subject.pass ? "Pass" : "Fail"}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="7" className="text-center">
                        No Result Found
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
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
              কি ভাই স্পার্কের মেম্বার না? রেজাল্ট দেখার অনুমতি নেই।
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default Student;
