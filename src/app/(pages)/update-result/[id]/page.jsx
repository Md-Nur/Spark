"use client";
import { useEffect, useState } from "react";
import HeroForm from "@/components/HeroForm";
import { toast } from "react-toastify";
import axios from "axios";
import SingleSub from "./SingleSub";
import Loading from "@/components/Loading";
import { useRouter } from "next/navigation";

const UpdateResult = ({ params }) => {
  const [result, setResult] = useState(null);
  const router = useRouter();

  useEffect(() => {
    axios
      .get(`/api/student-info/${params.id}`)
      .then((res) => {
        // console.log(res);
        setResult(res.data);
      })
      .catch((e) => {
        toast.error(e.message);
      });
  }, []);

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
      .put(`/api/student-info/${params.id}`, result)
      .then((res) => {
        // console.log(res.data);
        toast.success(
          `Result updated successfully; Credit: 
          ${res.data.credit}, YGPA:
          ${parseFloat(res.data.ygpa).toFixed(3)}`
        );
      })
      .then(() => {
        router.push(`/results/${params.id}`);
        // console.log(result);
      })
      .catch((e) => {
        toast.error(e.message);
      });
  };

  if (!result) return <Loading />;

  return (
    <>
      <HeroForm
        title="Update result"
        description={`Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi. year: ${result.year}. Semester: ${result.semester}. Session: ${result.session}`}
      >
        <form className="card-body" onSubmit={handleSubmit}>
          <div className="form-control">
            <input
              type="text"
              placeholder="Name"
              className="input input-bordered"
              defaultValue={result?.name}
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
              defaultValue={result?.roll}
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
              defaultValue={result?.imgUrl}
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

export default UpdateResult;
