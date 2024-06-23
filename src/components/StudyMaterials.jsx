"use client";
import { useForm } from "react-hook-form";
import HeroForm from "./HeroForm";
import { useUserAuth } from "@/context/userAuth";
import axios from "axios";
import { toast } from "react-toastify";
import indoorGame from "@/pic/indoorGames.jpg";
import { useRouter } from "next/navigation";

const StudyMaterials = ({ sMData }) => {
  const { userAuth } = useUserAuth();
  const { register, handleSubmit } = useForm();
  const router = useRouter();
  const onSubmit = async (data) => {
    if (!sMData) {
      data.userId = userAuth._id;
      try {
        await axios.post("/api/study-materials", data);
        toast.success("Study material added successfully");
      } catch (error) {
        toast.error(error.response.data.error || error.message);
      }
    } else {
      try {
        await axios.put(`/api/study-materials/${sMData._id}`, data);
        toast.success("Study material updated successfully");
        router.push("/study-materials");
      } catch (error) {
        toast.error(error.response.data.error || error.message);
      }
    }
  };
  return (
    <HeroForm
      title="Study Materials"
      description="Add your study materials title and description here."
      imgUrl={indoorGame}
    >
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="p-3 md:p-7 space-y-5 bg-base-200 rounded-lg"
      >
        <div className="form-control">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            className="input input-bordered"
            id="title"
            placeholder="Enter title"
            {...register("title")}
            defaultValue={sMData?.title}
          />
        </div>
        <div className="form-control">
          <label htmlFor="driveUrl">Drive URL</label>
          <input
            type="text"
            className="input input-bordered"
            id="driveUrl"
            placeholder="Enter drive url"
            {...register("driveUrl")}
            defaultValue={sMData?.driveUrl}
          />
        </div>
        <button type="submit" className="btn btn-primary m-3">
          Submit
        </button>
      </form>
    </HeroForm>
  );
};

export default StudyMaterials;
