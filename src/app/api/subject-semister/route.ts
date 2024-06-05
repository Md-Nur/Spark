import dbConnect from "@/lib/dbConnect";
import SubjectSemisterModel, { SubjectSemister } from "@/model/SubjectSemister";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  await dbConnect();
  const url = new URL(request.url);
  const year = url.searchParams.get("year");
  const semester = url.searchParams.get("semester");
  try {
    const data = await SubjectSemisterModel.findOne({
      year: year,
      semister: semester,
    });
    return Response.json({ data });
  } catch (error) {
    console.error(error);
    return Response.json({ error });
  }
}

export async function POST(request: Request) {
  await dbConnect();
  const body = await request.json();
  const data = {
    year: Number(body.year),
    semister: body.semister,
    subjects: body.subjects.map((subject: any) => ({
      name: subject.name,
      code: subject.code,
      credit: Number(subject.credit),
      type: subject.type,
    })) as SubjectSemister["subjects"],
  } as SubjectSemister;

  try {
    const resData = await SubjectSemisterModel.create(data);
    return Response.json({ resData });
  } catch (error) {
    return Response.json({ error });
  }
}
