import dbConnect from "@/lib/dbConnect";
import StudentModel from "@/model/Student";

export async function GET(req, { params }) {
  await dbConnect();
  const student = await StudentModel.findById(params.id);
  if (!student) {
    return Response.json("Student not found", 404);
  }
  return Response.json(student);
}
