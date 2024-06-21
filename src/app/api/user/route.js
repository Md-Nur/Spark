import UserModel from "@/model/User";
import dbConnect from "@/lib/dbConnect";

export async function GET(req) {
  await dbConnect();
  const url = new URL(req.url);
  const search = url.searchParams.get("search");
  // console.log("Here in route.js");
  const users = await UserModel.aggregate([
    {
      $match: {
        $or: [
          { name: { $regex: search, $options: "i" } },
          { email: { $regex: search, $options: "i" } },
          { facebook: { $regex: search, $options: "i" } },
          { linkedin: { $regex: search, $options: "i" } },
          { session: { $regex: search, $options: "i" } },
          { homeTown: { $regex: search, $options: "i" } },
        ],
      },
    },
    {
      $addFields: {
        rollNo: {
          $mod: ["$roll", 1000],
        },
      },
    },
    {
      $sort: {
        session: -1,
        rollNo: 1,
      },
    },
    {
      $project: {
        rollNo: 0,
      },
    },
  ]);

  return Response.json(users);
}
