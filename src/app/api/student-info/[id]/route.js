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

export async function PUT(req, { params, body }) {
  await dbConnect();
  const student = await StudentModel.findByIdAndUpdate(params.id, body, {
    new: true,
    runValidators: true,
  });
  if (!student) {
    return Response.json("Student not found", 404);
  }
  return Response.json(student);
}

export async function DELETE(req, { params }) {
  await dbConnect();
  const student = await StudentModel.findByIdAndDelete(params.id);
  if (!student) {
    return Response.json("Student not found", 404);
  }
  return Response.json(student);
}
