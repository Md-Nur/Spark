import UserModel, { User } from "@/model/User";
import dbConnect from "@/lib/dbConnect";
import LatestModel, { Latest } from "@/model/Latest";
import { hall } from "@/lib/utils";

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  await dbConnect();
  const url = new URL(req.url);

  let year: any = url.searchParams.get("year");
  let semester: any = url.searchParams.get("semester");

  let latest: Latest | any = await LatestModel.findOne();

  if (year !== "undefined" && semester !== "undefined") {
    latest.year = parseInt(year);
    latest.semester = semester;
  }

  // console.log(latest);

  const user = await UserModel.aggregate([
    {
      $addFields: {
        id: {
          $toString: "$_id",
        },
      },
    },
    {
      $match: {
        id: { $eq: params.id },
      },
    },
    {
      $lookup: {
        from: "results",
        localField: "id",
        foreignField: "user_id",
        as: "results",
      },
    },

    {
      $addFields: {
        ygpa: {
          $arrayElemAt: ["$ygpa", latest.year - 1],
        },
      },
    },
    {
      $project: {
        id: 0,
        regregistrationNo: 0,
      },
    },
  ]);

  let result = user[0].results.find((result: any) => {
    return result.semester === latest.semester && result.year === latest.year;
  });

  // @ts-ignore
  const hallName: string = hall[user[0].hallCode];

  delete user[0].results;

  return Response.json({
    ...user[0],
    hall: hallName,
    result: result,
  });
}

export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  await dbConnect();

  const data = await req.json();
  const updatedUser = {
    ...data,
    roll: parseInt(data.roll),
    hallCode: (parseInt(data.roll) / 100000) % 1000,
    registrationNo: parseInt(data.registrationNo),
  };
  const user = await UserModel.findByIdAndUpdate(params.id, updatedUser);
  return Response.json(user);
}
