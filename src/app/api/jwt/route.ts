import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

export async function GET(req: Request) {
  const token: string | undefined = cookies().get("token")?.value;
  // console.log(token);
  if (!token) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }
  const user: any = jwt.verify(token, process.env.JWT_SECRET!);
  if (!user || !user?._doc) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }
  return Response.json(user._doc);
}
