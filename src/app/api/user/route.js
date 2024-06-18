import UserModel from "@/model/User";
import dbConnect from "@/lib/dbConnect";

export async function GET(req) {
  await dbConnect();
  const url = new URL(req.url);
  const search = url.searchParams.get("search");

  const users = await UserModel.find({
    name: { $regex: search, $options: "i" },
  });

  return Response.json(users);
}
