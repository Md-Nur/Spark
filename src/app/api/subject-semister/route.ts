import dbConnect from "@/lib/dbConnect";
import SubjectSemesterModel, { SubjectSemester } from "@/model/SubjectSemister";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  await dbConnect();
  const url = new URL(request.url);
  const year = url.searchParams.get("year");
  const semester = url.searchParams.get("semester");
  const session = url.searchParams.get("session");
  const teacher = url.searchParams.get("teacher");

  if (teacher && !year && !semester && !session) {
    try {
      const data = await SubjectSemesterModel.find({
        isNewer: true,
      })
        .sort({ _id: -1 })
        .limit(1);
      return Response.json(data[0]);
    } catch (error) {
      console.error(error);
      return Response.error();
    }
  } else if (year && semester && session) {
    try {
      const data = await SubjectSemesterModel.findOne({
        year: year,
        semester: semester,
        isNewer: session === "22-23",
      });
      return Response.json({ data });
    } catch (error) {
      console.error(error);
      return Response.error();
    }
  }
}

export async function POST(request: Request) {
  await dbConnect();
  const body = await request.json();
  const data = {
    year: Number(body.year),
    semester: body.semester,
    isNewer: body.isNewer === "true",
    subjects: body.subjects.map((subject: any) => ({
      name: subject.name,
      teacher: {
        secA: subject.teacher.secA,
        secB: subject.teacher.secB,
      },
      code: subject.code,
      credit: Number(subject.credit),
      type: subject.type,
    })) as SubjectSemester["subjects"],
  } as SubjectSemester;

  try {
    const resData = await SubjectSemesterModel.create(data);
    return Response.json(resData);
  } catch (error) {
    return Response.json(error);
  }
}
