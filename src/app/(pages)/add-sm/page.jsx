"use client";
import { useUserAuth } from "@/context/userAuth";
import StudyMaterials from "./StudyMaterials";

const AddSm = () => {
  const { userAuth } = useUserAuth();
  if (!userAuth) return <div>Not authorized</div>;

  return <StudyMaterials />;
};

export default AddSm;
