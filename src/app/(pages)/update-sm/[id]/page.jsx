"use client";
import { useQuery } from "@tanstack/react-query";
import Loading from "@/components/Loading";
import StudyMaterials from "@/app/(pages)/add-sm/StudyMaterials";
import axios from "axios";

const UpdateSM = ({ params }) => {
  const sm = useQuery({
    queryKey: ["sm", params.id],
    queryFn: async () => {
      const response = await axios.get(`/api/study-materials/${params.id}`);
      return response.data;
    },
  });
  if (sm.isLoading) return <Loading />;
  return <StudyMaterials sMData={sm.data} />;
};

export default UpdateSM;
