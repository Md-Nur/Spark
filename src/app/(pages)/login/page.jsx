"use client";
import HeroForm from "@/components/HeroForm";
import { useUserAuth } from "@/context/userAuth";
import axios from "axios";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

const Login = () => {
  const router = useRouter();
  const { setUserAuth } = useUserAuth();
  const { register, handleSubmit } = useForm();
  const onSubmit = (data) => {
    toast.loading("Logging in...");
    axios
      .post("/api/login", data)
      .then((res) => {
        setUserAuth(res.data);
        toast.dismiss();
        toast.success("Logged in successfully");
        router.push("/");
      })
      .catch((err) => {
        toast.dismiss();
        toast.error(err.response.data.error || err.message);
      });
  };
  return (
    <HeroForm
      title="LogIn"
      description="You have to enter your roll number and password to login this website. Your password is your registration number."
      imgUrl="https://i.ibb.co/SxBcL4B/IMG20240527193319.jpg"
    >
      <form className="card-body" onSubmit={handleSubmit(onSubmit)}>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Roll</span>
          </label>
          <input
            {...register("roll")}
            type="number"
            placeholder="Roll"
            className="input input-bordered"
            required
          />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Password</span>
          </label>
          <input
            {...register("registrationNo")}
            type="password"
            placeholder="Password"
            className="input input-bordered"
            required
          />
        </div>
        <div className="form-control mt-6">
          <button className="btn btn-primary">Login</button>
        </div>
      </form>
    </HeroForm>
  );
};

export default Login;
