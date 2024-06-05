"use client";

import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { toast } from "react-toastify";
import Loading from "@/components/Loading";

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
        <div className="flex flex-col justify-center gap-2">
          <h1 className="text-3xl font-bold uppercase">{result?.name}</h1>
          <img
            src={result?.imgUrl}
            alt={result?.name}
            className="w-72 h-72 rounded-lg shadow-2xl"
          />
          <p className="">Roll: {result?.roll}</p>
          <p className="">Session: {result?.session}</p>
          <p className="">Year: {result?.year}</p>
          <p className="">Semester: {result?.semester}</p>
          <p className="">GPA: {parseFloat(result?.ygpa).toFixed(3)}</p>
          <p className="">Credit: {result?.credit}</p>
          <span className="btn btn-accent my-2 w-20">
            {result?.pass ? "Passed" : "Failed"}
          </span>
        </div>
        <div>
          <h3 className="text-xl font-bold my-2">SUBJECTS:</h3>
          <div className="overflow-x-auto">
            <table className="table text-base">
              {/* head */}
              <thead className="text-base">
                <tr>
                  <th>Name</th>
                  <th className="hidden lg:inline-block">Code</th>
                  <th>Credit</th>
                  <th>Grade</th>
                  <th>GPA</th>
                  <th className="hidden sm:table-cell">Type</th>
                  <th className="hidden md:inline-block">Status</th>
                </tr>
              </thead>
              <tbody>
                {result?.subjects.map((subject) => (
                  <tr key={subject.id} className="hover">
                    <td>{subject.name}</td>
                    <td className="hidden lg:inline-block">{subject.code}</td>
                    <td>{subject.credit}</td>
                    <td>{subject.grade}</td>
                    <td>{subject.sgpa}</td>
                    <td className="hidden sm:table-cell">{subject.type}</td>
                    <td
                      className={`hidden md:inline-block ${
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
          {result?.pass && (
            <>
              <h3 className="text-lg font-bold my-2 uppercase">
                Improvements:
              </h3>
              <ul>
                {result?.subjects
                  .filter((sub) => sub.improvement)
                  .map((sub) => (
                    <li key={sub.code}>{sub.name}</li>
                  ))}
              </ul>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default SingleResult;
