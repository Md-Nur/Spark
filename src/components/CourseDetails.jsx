"use client";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Loading from "./Loading";

const year = {
  1: "First Year",
  2: "Second Year",
  3: "Third Year",
  4: "Fourth Year",
};

const CourseDetails = () => {
  const course = useQuery({
    queryKey: ["course"],
    queryFn: async () => {
      const response = await axios.get("/api/subject-semister?teacher=1");
      return response.data;
    },
  });
  if (course.isLoading) return <Loading />;
//   console.log(course.data);

  return (
    <section className="w-full my-20">
      <h1 className="text-4xl font-bold my-10 text-center">
        {year[course?.data.year]} {course?.data.semester} Semester Course
        Details
      </h1>
      <div className="overflow-x-auto">
        <table className="table table-xs sm:table-sm md:table-md lg:table-lg lg:w-auto lg:mx-auto">
          {/* head */}
          <thead className="bg-base-200 text-base">
            <tr>
              <th rowSpan={2}>Course Title</th>
              <th rowSpan={2}>Course Code</th>
              <th rowSpan={2}>Credit</th>
              <th className="text-center" colSpan={2}>
                Teacher Name
              </th>
              <th rowSpan={2}>Type</th>
            </tr>
            <tr>
              <th>Section A</th>
              <th>Section B</th>
            </tr>
          </thead>
          <tbody>
            {course.data.subjects.map((subject) => (
              <tr key={subject.id} className="hover">
                <td>{subject.name}</td>
                <td>{subject.code}</td>
                <td>{subject.credit}</td>
                <td>{subject.teacher.secA}</td>
                <td>{subject.teacher.secB}</td>
                <td>
                  <button
                    className={`btn btn-sm btn-${
                      subject.type === "Theory" ? "primary" : "secondary"
                    } btn-outline`}
                  >
                    {subject.type}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default CourseDetails;
