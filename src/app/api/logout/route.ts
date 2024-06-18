import { cookies } from "next/headers";

export async function GET(req: Request) {
  cookies().delete("token");
  return Response.json({ message: "Logged out" });
}
