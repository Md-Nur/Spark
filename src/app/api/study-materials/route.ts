import dbConnect from "@/lib/dbConnect";
import StudyMaterialsModel from "@/model/StudyMaterials";

export async function GET(req: Request) {
  await dbConnect();
  const studyMaterials = await StudyMaterialsModel.aggregate([
    {
      $addFields: {
        userId: { $toObjectId: "$userId" },
      },
    },
    {
      $lookup: {
        from: "users",
        localField: "userId",
        foreignField: "_id",
        as: "user",
      },
    },
    {
      $unwind: "$user",
    },
    {
      $project: {
        title: 1,
        driveUrl: 1,
        "user.name": 1,
        "user._id": 1,
      },
    },
  ]);
  return Response.json(studyMaterials);
}

export async function POST(req: Request) {
  await dbConnect();
  const data = await req.json();
  const sm = await StudyMaterialsModel.create(data);
  return Response.json(sm);
}
