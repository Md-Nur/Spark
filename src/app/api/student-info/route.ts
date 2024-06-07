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
  const search = url.searchParams.get("search");
  let fvalue: any = url.searchParams.get("fvalue");
  let svalue: any = url.searchParams.get("svalue");

  if (svalue === "1" || svalue === "-1") {
    svalue = parseInt(svalue);
  }
  if (fvalue === "true" || fvalue === "false") {
    fvalue = fvalue === "true";
  }

  let sortObj: any = {};
  // Create a sort object
  let filterObj: any = {};
  if (sort) {
    sortObj[sort] = svalue;
  }
  if (filter) {
    filterObj[filter] = fvalue;
  }

  if (search) {
    students = await StudentModel.find({
      name: { $regex: search, $options: "i" },
    });
  } else if (sort || filter) {
    students = await StudentModel.find(filterObj).sort(sortObj);
  } else {
    students = await StudentModel.find({});
  }

  return Response.json(students);
}
