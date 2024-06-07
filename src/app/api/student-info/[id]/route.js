import dbConnect from "@/lib/dbConnect";
import { calculateYgpa, getCredit, gradeToSgpa, isPass } from "@/lib/utils";
import StudentModel from "@/model/Student";

export async function GET(req, { params }) {
  await dbConnect();
  const student = await StudentModel.findById(params.id);
  if (!student) {
    return Response.json("Student not found", 404);
  }
  return Response.json(student);
}

export async function PUT(request, { params }) {
  await dbConnect();

  const student = await request.json();

  // console.log(student);

  let onlySubjects = student.subjects.map((sub) => ({
    name: sub.name,
    code: sub.code,
    credit: Number(sub.credit),
    grade: sub.grade,
    type: sub.type,
    sgpa: gradeToSgpa(sub.grade),
    pass: sub.grade !== "F",
    improvement:
      gradeToSgpa(sub.grade) < (student.session === "22-23" ? 2.75 : 3.0) &&
      sub.type === "Theory" &&
      sub.grade !== "F",
  }));

  const data = {
    name: student.name,
    roll: Number(student.roll),
    imgUrl: student.imgUrl,
    session: student.session,
    semester: student.semester,
    year: Number(student.year),
    ygpa: calculateYgpa(student.subjects),
    credit: getCredit(student.subjects),
    pass: isPass(student.subjects),
    subjects: onlySubjects,
  };
  // console.log(data);

  try {
    const res = await StudentModel.findOneAndUpdate({ _id: params.id }, data);
    return Response.json(res);
  } catch (error) {
    return Response.json({ error });
  }
}

export async function DELETE(req, { params }) {
  await dbConnect();
  const student = await StudentModel.findByIdAndDelete(params.id);
  if (!student) {
    return Response.json("Student not found", 404);
  }
  return Response.json(student);
}
