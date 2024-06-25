import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User";

export async function GET(req: Request) {
  await dbConnect();
  const cr = [2311079120, 2310679101];
  const crs = await UserModel.find({ roll: { $in: cr } });
//   console.log(crs);
  return Response.json(crs);
}
