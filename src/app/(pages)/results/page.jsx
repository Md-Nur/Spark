"use client";

import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Loading from "@/components/Loading";

const Results = () => {
  const [results, setResult] = useState([]);
  const [sort, setSort] = useState({
    name: "ygpa",
    value: -1,
  });
  const [searchName, setSearchName] = useState("");

  const [filter, setFilter] = useState({
    name: "",
    value: true,
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    axios
      .get(
        `/api/student-info?filter=${filter.name}&fvalue=${filter.value}&sort=${sort.name}&svalue=${sort.value}&search=${searchName}`
      )
      .then((response) => {
        console.log(response);
        setResult(response?.data);
        // console.log(response.data);
      })
      .catch((error) => {
        toast.error(error?.message);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [filter, sort, searchName]);

  return (
    <section className="flex flex-col items-center gap-5 min-h-screen p-2">
      <h1 className="text-4xl font-bold my-5">Results</h1>
      <div className="flex flex-wrap gap-3 justify-center items-center">
        <input
          className="input input-bordered w-44"
          type="text"
          placeholder="Search By Name"
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
          <option value="ygpa asc">GPA ascending</option>
          <option value="ygpa desc">GPA descending</option>
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
          <option value="pass true">Pass</option>
          <option value="pass false">Fail</option>
          <option value="session 22-23">Session 22-23</option>
          <option value="session 21-22">Session 21-22</option>
          <option value="session 20-21">Session 20-21</option>
        </select>
      </div>
      <div className="overflow-x-auto">
        <table className="table lg:text-lg">
          {/* head */}
          <thead className="lg:text-xl">
            <tr>
              <th>Sl</th>
              <th>Name</th>
              <th>Roll</th>
              <th className="hidden md:table-cell">Session</th>
              <th>Credit</th>
              <th>GPA</th>
              <th className="hidden sm:table-cell">Status</th>
            </tr>
          </thead>
          <tbody>
            {!loading ? (
              results.map((result, ind) => (
                <tr key={result.id} className="hover">
                  <td>
                    <Link href={`/results/${result._id}`}>{ind + 1}</Link>
                  </td>
                  <Link href={`/results/${result._id}`}>
                    <td>{result.name}</td>
                  </Link>
                  <td>
                    <Link href={`/results/${result._id}`}>{result.roll}</Link>
                  </td>
                  <td className="hidden md:table-cell">{result.session}</td>
                  <td>{result.credit}</td>
                  <td>{parseFloat(result.ygpa).toFixed(3)}</td>
                  <td
                    className={`hidden sm:table-cell ${
                      result.pass ? "text-green-500" : "text-red-500"
                    }`}
                  >
                    {result.pass ? "Pass" : "Fail"}
                  </td>
                </tr>
              ))
            ) : (
              <Loading />
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default Results;
