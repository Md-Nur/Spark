"use client";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Loading from "@/components/Loading";

const year = {
  1: "First Year",
  2: "Second Year",
  3: "Third Year",
  4: "Fourth Year",
};

const CourseDetails = () => {
  const courses = useQuery({
    queryKey: ["course"],
    queryFn: async () => {
      const response = await axios.get("/api/subject-semister?teacher=1");
      return response.data;
    },
  });
  if (courses.isLoading) return <Loading />;
  //   console.log(course.data);

  return (
    <section className="w-full my-20">
      {courses.data.map((course) => (
        <div key={course._id}>
          <h1 className="text-4xl font-bold my-10 text-center">
            {year[course?.year]} {course.semester} Semester Course Details
          </h1>
          <div className="overflow-x-auto">
            <table className="table table-xs sm:table-sm md:table-md lg:table-lg lg:w-auto lg:mx-auto">
              {/* head */}
              <thead className="bg-base-200 text-base">
                <tr>
                  <th rowSpan={2}>Course Title</th>
                  <th rowSpan={2}>Course Code</th>
                  <th rowSpan={2}>Credit</th>
                  {course.subjects[0].teacher && (
                    <th className="text-center" colSpan={2}>
                      Teacher Name
                    </th>
                  )}
                  <th rowSpan={2}>Type</th>
                </tr>
                {course.subjects[0].teacher && (
                  <tr>
                    <th>Section A</th>
                    <th>Section B</th>
                  </tr>
                )}
              </thead>
              <tbody>
                {course.subjects.map((subject) => (
                  <tr key={subject.id} className="hover">
                    <td>{subject.name}</td>
                    <td>{subject.code}</td>
                    <td>{subject.credit}</td>
                    {subject.teacher && (
                      <>
                        <td className="uppercase">{subject.teacher.secA}</td>
                        <td className="uppercase">{subject.teacher.secB}</td>
                      </>
                    )}
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
        </div>
      ))}
    </section>
  );
};

export default CourseDetails;
