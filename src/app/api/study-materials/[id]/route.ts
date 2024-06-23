import dbConnect from "@/lib/dbConnect";
import StudyMaterialsModel from "@/model/StudyMaterials";

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  await dbConnect();

  const studyMaterials = await StudyMaterialsModel.findById(params.id);
  return Response.json(studyMaterials);
}

export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  await dbConnect();
  const id = params.id;
  const data = await req.json();
  const sm = await StudyMaterialsModel.findByIdAndUpdate(id, data, {
    new: true,
  });
  return Response.json(sm);
}

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  await dbConnect();
  const sm = await StudyMaterialsModel.findByIdAndDelete(params.id);
  return Response.json(sm);
}
