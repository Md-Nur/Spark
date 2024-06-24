import dbConnect from "@/lib/dbConnect";
import ContentModel from "@/model/Contents";

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  await dbConnect();
  const content = await ContentModel.findById(params.id);
  return Response.json(content);
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
