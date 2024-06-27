import dbConnect from "@/lib/dbConnect";
import ContentModel from "@/model/Contents";

export async function POST(req: Request) {
  await dbConnect();
  const data = await req.json();
  const content = await ContentModel.create(data);
  return Response.json(content);
}

export async function GET(req: Request) {
  await dbConnect();
  const url = new URL(req.url);
  const type = url.searchParams.get("type");
  const admin = url.searchParams.get("admin");
  const limit = url.searchParams.get("limit");

  let pipeline: any[] = [];

  if (!admin) {
    pipeline.push({
      $match: { isApproved: true },
    });

    if (type === "blog") {
      pipeline.push({ $match: { type: "blog" } });
    } else if (!limit) {
      pipeline.push({ $match: { type: { $ne: "blog" } } });
    }
  }
  if (limit) {
    pipeline.push({
      $limit: parseInt(limit),
    });
  }

  pipeline = [
    ...pipeline,
    {
      $sort: {
        createdAt: -1,
      },
    },
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
        thumbnail: 1,
        tags: 1,
        type: 1,
        content: 1,
        createdAt: 1,
        updatedAt: 1,
        isApproved: 1,
        "user.name": 1,
        "user.email": 1,
      },
    },
  ];

  const contents = await ContentModel.aggregate(pipeline);

  // console.log(contents);
  return Response.json(contents);
}
