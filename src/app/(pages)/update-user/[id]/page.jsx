"use client";
import HeroForm from "@/components/HeroForm";
import { toast } from "react-toastify";
import axios from "axios";
import Loading from "@/components/Loading";
import { useQuery } from "@tanstack/react-query";
import { useUserAuth } from "@/context/userAuth";
import { useForm } from "react-hook-form";

const UpdateResult = ({ params }) => {
  const { userAuth, loading } = useUserAuth();
  const { register, handleSubmit, reset } = useForm();

  const user = useQuery({
    queryKey: ["user", params.id],
    queryFn: async () => {
      const response = await axios.get(`/api/user/${params.id}`);
      return response.data;
    },
  });

  const onSubmit = async (data) => {
    toast.loading("Updating user info...");
    try {
      if (data.imgFile.length) {
        const imgData = new FormData();
        imgData.append("image", data.imgFile[0]);
        const imgURL = await axios.post(
          `https://api.imgbb.com/1/upload?key=${process.env.NEXT_PUBLIC_IMGBB_API_KEY}`,
          imgData
        );
        data.imgUrl = imgURL.data.data.url;
      }
      delete data.imgFile;

      await axios.put(`/api/user/${params.id}`, data);

      toast.dismiss();
      toast.success("User info updated successfully");
      user.refetch();
      reset();
    } catch (error) {
      toast.dismiss();
      toast.error(error.message);
    }
  };

  if (user.isLoading || loading) return <Loading />;

  if (userAuth?._id !== params.id && userAuth?.role !== "Admin") {
    toast.error("Only Admin or the own user can modify his/her info");
    return <Loading />;
  }

  return (
    <>
      <HeroForm
        title="Update Student Info"
        description={`
          If any student did't provide real information like roll and registration number then he/she can't be logged in this website and can't be a member of spark family
          `}
        imgUrl={user.data?.imgUrl}
      >
        <form className="card-body" onSubmit={handleSubmit(onSubmit)}>
          <div className="form-control">
            <input
              type="text"
              placeholder="Name"
              className="input input-bordered"
              defaultValue={user.data?.name}
              {...register("name")}
              required
            />
          </div>
          <div className="form-control">
            <input
              type="email"
              placeholder="Email"
              className="input input-bordered"
              defaultValue={user.data?.email}
              {...register("email")}
            />
          </div>
          <div className="form-control">
            <input
              type="number"
              placeholder="Roll"
              className="input input-bordered"
              defaultValue={user.data?.roll}
              {...register("roll")}
              required
              min={2010079100}
            />
          </div>

          <div className="form-control">
            <input
              type="file"
              placeholder="Image Url"
              className="input input-bordered file-input"
              {...register("imgFile")}
            />
          </div>

          <div className="form-control">
            <select
              className="select select-bordered"
              defaultValue={user.data?.session}
              {...register("session")}
              required
            >
              <option value={user.data?.session}>{user.data?.session}</option>
              <option value="22-23">22-23</option>
              <option value="21-22">21-22</option>
              <option value="20-21">20-21</option>
            </select>
          </div>

          <div className="form-control">
            <input
              type="number"
              placeholder="Registration Number"
              className="input input-bordered"
              defaultValue={user.data?.registrationNo}
              {...register("registrationNo")}
              required
            />
          </div>
          <div className="form-control">
            <input
              type="text"
              placeholder="Home Town"
              className="input input-bordered"
              defaultValue={user.data?.homeTown}
              {...register("homeTown")}
            />
          </div>
          <div className="form-control">
            <input
              type="text"
              placeholder="Phone Number"
              className="input input-bordered"
              defaultValue={user.data?.phone}
              {...register("phone")}
            />
          </div>
          <div className="form-control">
            <input
              type="text"
              placeholder="Whatsapp Number"
              className="input input-bordered"
              defaultValue={user.data?.whatsapp}
              {...register("whatsapp")}
            />
          </div>
          <div className="form-control">
            <input
              type="text"
              placeholder="Telegram Number"
              className="input input-bordered"
              defaultValue={user.data?.telegram}
              {...register("telegram")}
            />
          </div>
          <div className="form-control">
            <input
              type="url"
              placeholder="LinkedIn Profile Link"
              className="input input-bordered"
              defaultValue={user.data?.linkedin}
              {...register("linkedin")}
            />
          </div>
          <div className="form-control">
            <input
              type="url"
              placeholder="Facebook Profile Link"
              className="input input-bordered"
              defaultValue={user.data?.facebook}
              {...register("facebook")}
            />
          </div>

          <div className="form-control mt-6">
            <button className="btn btn-primary">Submit</button>
          </div>
        </form>
      </HeroForm>
    </>
  );
};

export default UpdateResult;
