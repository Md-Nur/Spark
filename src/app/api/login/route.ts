import dbConnect from "@/lib/dbConnect";
import UserModel, { User } from "@/model/User";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

export async function POST(req: Request) {
  await dbConnect();
  const { roll, registrationNo } = await req.json();
  const user: User | null = await UserModel.findOne({ roll, registrationNo });
  if (!user) {
    return Response.json(
      { error: "Roll and registration number didn't match" },
      { status: 404 }
    );
  }
  const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET!, {
    expiresIn: "7d",
  });

  cookies().set("token", token, {
    httpOnly: true,
    secure: true,
    sameSite: "strict",
    maxAge: 60 * 60 * 24 * 7,
  });

  return Response.json(user);
}
