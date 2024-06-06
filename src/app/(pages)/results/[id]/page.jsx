"use client";

import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { toast } from "react-toastify";
import Loading from "@/components/Loading";
import DeleteResult from "@/components/DeleteResult";

const SingleResult = ({ params }) => {
  const [result, setResult] = useState(null);
  useEffect(() => {
    axios
      .get(`/api/student-info/${params.id}`)
      .then((res) => {
        setResult(res.data);
      })
      .catch((err) => toast.error(err.message));
  }, []);

  if (!result) return <Loading />;
  return (
    <div className="hero min-h-screen bg-base-200 w-full">
      <div className="hero-content flex-col lg:flex-row justify-around w-full">
        <div className="flex flex-col justify-center gap-2 border-b-2 border-base-content md:border-b-0">
          <h1 className="text-3xl font-bold uppercase">{result?.name}</h1>
          <img
            src={result?.imgUrl}
            alt={result?.name}
            className="w-72 h-72 rounded-lg shadow-2xl object-cover"
          />
          <p className="">Roll: {result?.roll}</p>
          <p className="">Session: {result?.session}</p>
          <p className="">Year: {result?.year}</p>
          <p className="">Semester: {result?.semester}</p>
          <p className="">GPA: {parseFloat(result?.ygpa).toFixed(3)}</p>
          <p className="">Credit: {result?.credit}</p>
          <div className="flex flex-wrap w-full justify-between items-center border-t-2 border-base-content">
            <span className="btn btn-accent my-2 w-20">
              {result?.pass ? "Passed" : "Failed"}
            </span>
            <DeleteResult id={result._id} />
          </div>
        </div>
        <div className="border-t-2 border-base-content md:border-t-0">
          <h3 className="text-xl font-bold my-2">SUBJECTS:</h3>
          <div className="overflow-x-auto">
            <table className="table text-base">
              {/* head */}
              <thead className="text-base">
                <tr>
                  <th>Name</th>
                  <th className="hidden lg:table-cell">Code</th>
                  <th>Credit</th>
                  <th>Grade</th>
                  <th>GPA</th>
                  <th className="hidden sm:table-cell">Type</th>
                  <th className="hidden md:table-cell">Status</th>
                </tr>
              </thead>
              <tbody>
                {result?.subjects.map((subject) => (
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
                ))}
              </tbody>
            </table>
          </div>
          {result?.pass &&
            result?.subjects.find(
              (sub) => sub.improvement || sub.grade === "F"
            ) && (
              <div className="flex w-full justify-between flex-wrap border-t-2 border-base-content my-5 py-5">
                <div>
                  <h3 className="text-lg font-bold my-2 uppercase">
                    Improvements:
                  </h3>
                  <ul className="px-3">
                    {result?.subjects
                      .filter((sub) => sub.improvement && sub.grade !== "F")
                      .map((sub) => (
                        <li className="list-disc" key={sub.code}>{sub.name}</li>
                      ))}
                  </ul>
                </div>
                <div>
                  <h3 className="text-lg font-bold my-2 uppercase">
                    Credit Lost:
                  </h3>
                  <ul className="px-3">
                    {result?.subjects
                      .filter((sub) => sub.grade === "F")
                      .map((sub) => (
                        <li className="list-disc" key={sub.code}>{sub.name}</li>
                      ))}
                  </ul>
                </div>
              </div>
            )}
        </div>
      </div>
    </div>
  );
};

export default SingleResult;
