"use client";
import HeroForm from "@/components/HeroForm";
import { useUserAuth } from "@/context/userAuth";
import axios from "axios";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import Head from "next/head";

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
    <>
      <Head>
        <title>Login - Spark</title>
        <meta
          name="description"
          content="Dear SPARK-08 member, Please login with your student ID and Registration number to see / update profiles and results"
          key="desc"
        />
      </Head>
      <HeroForm
        title="LogIn"
        description="Dear SPARK-08 member,
Please login with your student ID and Registration number to see / update profiles and results"
        imgUrl="https://i.ibb.co/SxBcL4B/IMG20240527193319.jpg"
      >
        <form
          className="card-body w-full bg-base-200"
          onSubmit={handleSubmit(onSubmit)}
        >
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
    </>
  );
};

export default Login;
