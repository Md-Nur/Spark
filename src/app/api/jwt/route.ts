import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import UserModel from "@/model/User";

export async function GET(req: Request) {
  const token: string | undefined = cookies().get("token")?.value;
  // console.log(token);
  if (!token) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }
  const userId: any = jwt.verify(token, process.env.JWT_SECRET!);
  if (!userId) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
    }
  // console.log(userId._id);
  const newUser = await UserModel.findById(userId._id);
  // console.log(newUser);
  return Response.json(newUser);
}
