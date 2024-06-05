import dbConnect from "@/lib/dbConnect";
import StudentModel, { Student } from "@/model/Student";

import { calculateYgpa, getCredit, gradeToSgpa, isPass } from "@/lib/utils";

export async function POST(request: Request) {
  await dbConnect();

  const student = await request.json();

  // console.log(student);

  let onlySubjects = student.subjects.map((sub: any) => ({
    name: sub.name,
    code: sub.code,
    credit: Number(sub.credit),
    grade: sub.grade,
    type: sub.type,
    sgpa: gradeToSgpa(sub.grade),
    pass: sub.grade !== "F",
    improvement: gradeToSgpa(sub.grade) < 2.75 && sub.type === "Theory",
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
    subjects: onlySubjects as Student["subjects"],
  } as Student;
  console.log(data);

  try {
    const res = await StudentModel.create(data);
    return Response.json(res);
  } catch (error) {
    return Response.json({ error });
  }
}

export async function GET(request: Request) {
  let students = [] as Student[];
  await dbConnect();
  const url = new URL(request.url);
  const sort = url.searchParams.get("sort");
  const filter = url.searchParams.get("filter");
  let value: any = url.searchParams.get("value");

  if (value === "1" || value === "-1") {
    value = parseInt(value);
  } else if (value === "true" || value === "false") {
    value = value === "true";
  }

  // Create a sort object
  if (sort) {
    let sortObj: any = {};
    sortObj[sort] = value;
    students = await StudentModel.find({}).sort(sortObj);
  } else if (filter) {
    let filterObj: any = {};
    filterObj[filter] = value;
    students = await StudentModel.find(filterObj);
  } else {
    students = await StudentModel.find({});
  }

  return Response.json(students);
}
