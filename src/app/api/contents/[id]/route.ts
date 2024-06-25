import dbConnect from "@/lib/dbConnect";
import ContentModel from "@/model/Contents";

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  await dbConnect();
  const content = await ContentModel.aggregate([
    {
      $addFields: {
        userId: { $toObjectId: "$userId" },
        id: { $toString: "$_id" },
      },
    },
    {
      $match: {
        id: params.id,
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
        "user.registrationNo": 0,
        id: 0,
      },
    },
  ]);
  return Response.json(content[0]);
}

export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  await dbConnect();
  const data = await req.json();
  const content = await ContentModel.findByIdAndUpdate(params.id, data, {
    new: true,
  });
  return Response.json(content);
}

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  await dbConnect();
  try {
    await ContentModel.findByIdAndDelete(params.id);
    return Response.json({ message: "Deleted successfully" });
  } catch (error) {
    return Response.json({ message: "Error deleting content" });
  }
}
