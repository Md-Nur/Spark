"use client";
import { useEffect, useState } from "react";
import HeroForm from "../../../components/HeroForm";
import { toast } from "react-toastify";
import axios from "axios";
import Modal from "./Modal";
import SingleSub from "./SingleSub";

const AddResult = () => {
  const [result, setResult] = useState();
  const [queries, setQueries] = useState({
    year: 1,
    semester: "Odd",
    session: "22-23",
  });

  useEffect(() => {
    document.getElementById("my_modal_add_result").showModal();
  }, []);

  useEffect(() => {
    axios
      .get(
        `/api/subject-semister?year=${queries.year}&semester=${queries.semester}&session=${queries.session}`
      )
      .then((res) => {
        console.log(res);
        setResult({
          ...result,
          year: queries.year,
          semester: queries.semester,
          subjects: res.data.data.subjects,
          session: queries.session,
        });
      })
      .catch((e) => {
        toast.error(e.message);
      });
  }, [queries]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      result.subjects.find(
        (sub) => sub.grade === undefined || sub.grade === "Grade"
      ) ||
      !result.roll ||
      !result.session
    ) {
      toast.error("Please fill all the fields");
      return;
    }
    axios
      .post("/api/student-info", result)
      .then((res) => {
        // console.log(res.data);
        toast.success(
          `Result added successfully; Credit: 
          ${res.data.credit}, YGPA:
          ${parseFloat(res.data.ygpa).toFixed(3)}`
        );
      })
      .then(() => {
        e.target.reset();
        // console.log(result);
      })
      .catch((e) => {
        toast.error(e.message);
      });
  };

  return (
    <>
      <Modal queries={queries} setQueries={setQueries} />
      <HeroForm
        title="Add result"
        description={`Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi. year: ${queries.year}. Semester: ${queries.semester}. Session: ${queries.session}`}
        imgUrl={result?.imgUrl}
      >
        <form className="card-body" onSubmit={handleSubmit}>
          <div className="form-control">
            <input
              type="text"
              placeholder="Name"
              className="input input-bordered"
              onBlur={(e) => {
                setResult({
                  ...result,
                  name: e.target.value,
                });
              }}
              autoComplete="off"
            />
          </div>
          <div className="form-control">
            <input
              type="number"
              placeholder="Roll"
              className="input input-bordered"
              onBlur={(e) => {
                setResult({
                  ...result,
                  roll: e.target.value,
                });
              }}
              required
              autoComplete="off"
            />
          </div>
          <div className="form-control">
            <input
              type="url"
              placeholder="Image Url"
              className="input input-bordered"
              onBlur={(e) => {
                setResult({
                  ...result,
                  imgUrl: e.target.value,
                });
              }}
              autoComplete="off"
            />
          </div>

          {result?.subjects &&
            result?.subjects.map((sub, i) => (
              <SingleSub result={result} setResult={setResult} i={i} key={i} />
            ))}
          <div className="form-control mt-6">
            <button className="btn btn-primary">Submit</button>
          </div>
        </form>
      </HeroForm>
    </>
  );
};

export default AddResult;
