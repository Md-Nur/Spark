"use client";

import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Loading from "@/components/Loading";
import { useUserAuth } from "@/context/userAuth";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";

const Results = () => {
  const { userAuth } = useUserAuth();
  const [results, setResult] = useState([]);
  const [sort, setSort] = useState({
    name: "roll",
    value: 1,
  });
  const [searchName, setSearchName] = useState("");
  const [year, setYear] = useState();
  const [semester, setSemester] = useState();

  const [filter, setFilter] = useState({
    name: "",
    value: true,
  });

  const result = useQuery({
    queryKey: ["results", sort, filter, searchName, year, semester],
    queryFn: async () => {
      const response = await axios.get(
        `/api/results?sort=${sort.name}&svalue=${sort.value}&filter=${filter.name}&fvalue=${filter.value}&search=${searchName}&year=${year}&semester=${semester}`
      );
      return response.data;
    },
  });

  if (result.isError) {
    toast.error(result.error.message);
  }
  console.log(result.data);

  return (
    <section className="flex flex-col items-center gap-5 min-h-screen p-2 w-full bg-base-100">
      <h1 className="text-4xl font-bold my-5">
        {userAuth ? "Results" : "Student Info"}
      </h1>
      <div className="flex flex-wrap gap-3 justify-center items-center w-full">
        <input
          className="input input-bordered w-72"
          type="text"
          placeholder="Search By Name or Home-Town"
          onChange={(e) => setSearchName(e.target.value)}
        />
        <select
          defaultValue="Sorting"
          className="select select-bordered"
          onChange={(e) =>
            setSort({
              ...sort,
              name: e.target.value.split(" ")[0],
              value: e.target.value.split(" ")[1] === "asc" ? 1 : -1,
            })
          }
        >
          <option disabled>Sorting</option>
          <option value="roll asc">Roll ascending</option>
          <option value="roll desc">Roll descending</option>
          <option value="credit asc">Credit ascending</option>
          <option value="credit desc">Credit descending</option>
          <option value="sgpa asc">SGPA ascending</option>
          <option value="sgpa desc">SGPA descending</option>
          <option value="ygpa asc">YGPA ascending</option>
          <option value="ygpa desc">YGPA descending</option>
          <option value="cgpa asc">CGPA ascending</option>
          <option value="cgpa desc">CGPA descending</option>
        </select>
        <select
          defaultValue="Filter"
          className="select select-bordered"
          onChange={(e) =>
            setFilter({
              name: e.target.value.split(" ")[0],
              value: e.target.value.split(" ")[1],
            })
          }
        >
          <option disabled>Filter</option>
          <option value="">All</option>
          <option value="pass true">Pass</option>
          <option value="pass false">Fail</option>
          <option value="session 22-23">Session 22-23</option>
          <option value="session 21-22">Session 21-22</option>
          <option value="session 20-21">Session 20-21</option>
        </select>
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
      </div>
      <div className="overflow-x-auto w-full lg:w-auto">
        <table className="table table-xs md:table-sm lg:table-md xl:table-lg lg:text-base">
          <thead className="lg:text-xl">
            <tr>
              <th className="">Sl</th>
              <th className="">Name</th>
              {userAuth && <th>Roll</th>}
              <th className="">Session</th>
              <th>Credit</th>
              {userAuth && (
                <>
                  <th>SGPA</th>
                  <th>YGPA</th>
                  <th>CGPA</th>
                </>
              )}
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {!result.isLoading ? (
              result.data.map((result, ind) => (
                <tr key={result.id} className="hover">
                  <td className="">
                    <Link href={`/student/${result.student._id}`}>
                      {ind + 1}
                    </Link>
                  </td>
                  <Link href={`/student/${result.student._id}`}>
                    <td>
                      <div className="flex items-center gap-3">
                        <div className="avatar">
                          <div className="mask mask-squircle w-12 h-12">
                            <Image
                              height={48}
                              width={48}
                              src={result.student.imgUrl}
                              alt={result.student.name}
                            />
                          </div>
                        </div>
                        <div>
                          <div className="font-bold">{result.student.name}</div>
                          <div className="text-sm opacity-50">
                            {result.student.homeTown}
                          </div>
                        </div>
                      </div>
                    </td>
                  </Link>
                  {userAuth && (
                    <td>
                      <Link href={`/student/${result.student._id}`}>
                        {result.student.roll}
                      </Link>
                    </td>
                  )}
                  <td className="">{result.student.session}</td>
                  <td>{result.credit}</td>
                  {userAuth && (
                    <>
                      <td>{result.sgpa.toFixed(3)}</td>
                      <td>{result.student.ygpa}</td>
                      <td>{result.student.cgpa}</td>
                    </>
                  )}
                  <td
                    className={`${
                      result.pass ? "text-green-500" : "text-red-500"
                    }`}
                  >
                    {result.pass ? "Pass" : "Fail"}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td>
                  <Loading />
                </td>
                <td>
                  <Loading />
                </td>
                <td>
                  <Loading />
                </td>
                <td>
                  <Loading />
                </td>
                <td>
                  <Loading />
                </td>
                {userAuth && (
                  <>
                    <td>
                      <Loading />
                    </td>
                    <td>
                      <Loading />
                    </td>
                    <td>
                      <Loading />
                    </td>
                    <td>
                      <Loading />
                    </td>
                  </>
                )}
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default Results;
