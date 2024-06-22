"use client";

import { useState } from "react";
import HeroForm from "../../../components/HeroForm";
import SingleSub from "./SingleSub";
import axios from "axios";
import { toast } from "react-toastify";

const AddSub = () => {
  const [subject, setSubject] = useState({
    year: 0,
    semester: "",
    isNewer: true,
    subjects: [
      {
        name: "",
        teacher: {
          secA: "",
          secB: "",
        },
        code: "",
        credit: 0,
        type: "",
      },
    ],
  });

  const handleAddSubField = () => {
    setSubject({
      ...subject,
      subjects: [
        ...subject.subjects,
        {
          name: "",
          teacher: {
            secA: "",
            secB: "",
          },
          code: "",
          credit: 0,
          type: "",
        },
      ],
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post("/api/subject-semister", subject)
      .then((res) => {
        toast.success("Subject added successfully");
        // console.log(res.data);
      })
      .then(() => {
        setSubject({
          year: 0,
          semester: "",
          subjects: [
            {
              name: "",
              teacher: {
                secA: "",
                secB: "",
              },
              code: "",
              credit: 0,
              type: "",
            },
          ],
        });
      })
      .catch((err) => {
        toast.error("Failed to add subject");
        console.log(err);
      });
  };
  return (
    <HeroForm
      title="Add subject"
      description="Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi."
    >
      <form className="card-body gap-7 bg-base-200" onSubmit={handleSubmit}>
        <div className="form-control">
          <select
            className="select select-bordered"
            defaultValue="Curriculum"
            onChange={(e) => {
              setSubject({
                ...subject,
                isNewer: e.target.value,
              });
            }}
          >
            <option disabled>Curriculum</option>
            <option value={true}>New</option>
            <option value={false}>Old</option>
          </select>
        </div>
        <div className="form-control">
          <select
            className="select select-bordered"
            defaultValue="Year"
            onChange={(e) => {
              setSubject({
                ...subject,
                year: e.target.value,
              });
            }}
          >
            <option disabled>Year</option>
            <option value="1">1st Year</option>
            <option value="2">2nd Year</option>
            <option value="3">3rd Year</option>
            <option value="4">4th Year</option>
          </select>
        </div>
        <div className="form-control">
          <select
            className="select select-bordered"
            defaultValue="Semester"
            onChange={(e) => {
              setSubject({
                ...subject,
                semester: e.target.value,
              });
            }}
          >
            <option disabled>Semester</option>
            <option value="Odd">Odd</option>
            <option value="Even">Even</option>
          </select>
        </div>

        {subject.subjects.map((sub, i) => (
          <SingleSub key={i} subject={subject} setSubject={setSubject} i={i} />
        ))}

        <div className="form-control mt-6 items-center">
          <button
            className="btn btn-sm btn-secondary mb-2 w-36"
            onClick={handleAddSubField}
          >
            Add Subject
          </button>
          <button className="btn btn-primary w-full">Submit</button>
        </div>
      </form>
    </HeroForm>
  );
};

export default AddSub;
