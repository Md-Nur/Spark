import dbConnect from "@/lib/dbConnect";
import LatestModel, { Latest } from "@/model/Latest";
import ResultModel, { Result } from "@/model/Result";

export async function GET(req: Request) {
  await dbConnect();
  const url = new URL(req.url);
  const search = url.searchParams.get("search");
  const sort = url.searchParams.get("sort");
  const filter = url.searchParams.get("filter");
  let fvalue: any = url.searchParams.get("fvalue");
  let svalue: any = url.searchParams.get("svalue");
  let year: any = url.searchParams.get("year");
  let semester: any = url.searchParams.get("semester");

  let latest: Latest | any = await LatestModel.findOne();

  if (year !== "undefined" && semester !== "undefined") {
    latest.year = parseInt(year);
    latest.semester = semester;
  }

  let pipeline: any = [
    {
      $match: {
        year: { $eq: latest?.year },
        semester: { $eq: latest?.semester },
      },
    },
    {
      $addFields: {
        userId: {
          $toObjectId: "$user_id",
        },
      },
    },
    {
      $lookup: {
        from: "users",
        localField: "userId",
        foreignField: "_id",
        as: "student",
      },
    },
    {
      $unwind: "$student",
    },
    {
      $match: {
        "student.name": { $regex: search, $options: "i" },
      },
    },
    {
      $addFields: {
        "student.roll": {
          $mod: ["$student.roll", 1000],
        },
      },
    },
    {
      $project: {
        _id: 0,
        __v: 0,
        student: {
          registrationNo: 0,
          __v: 0,
          role: 0,
        },
      },
    },
  ];

  if (
    sort &&
    (svalue === "1" || svalue === "-1") &&
    (sort === "roll" || sort === "ygpa" || sort === "cgpa")
  ) {
    const sortStage: any = {};
    sortStage[`student.${sort}`] = parseInt(svalue);
    pipeline.push({ $sort: sortStage });
  } else if (sort && (svalue === "1" || svalue === "-1")) {
    const sortStage: any = {};
    sortStage[sort] = parseInt(svalue);
    // console.log(sortStage);
    pipeline.push({ $sort: sortStage });
  }

  if (filter === "session" && fvalue) {
    const filterStage: any = {};
    filterStage["student.session"] = fvalue;
    pipeline.push({ $match: filterStage });
  } else if (filter === "pass" && fvalue) {
    const filterStage: any = {};
    filterStage.pass = fvalue === "true";
    pipeline.push({ $match: filterStage });
  }

  const resultUser = await ResultModel.aggregate(pipeline);

  return Response.json(resultUser);
}
