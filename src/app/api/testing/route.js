import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User";

export async function GET(req) {
  await dbConnect();
  const updatedUser = await UserModel.findById("66714150343860712aa28f70");
  return Response.json(updatedUser);
}
