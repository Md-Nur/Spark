import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User";

export async function GET(request: Request) {
  await dbConnect();
  const onlyAdmins = await UserModel.find({ role: "Admin" });
  return Response.json(onlyAdmins);
}
