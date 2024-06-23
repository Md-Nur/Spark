import mongoose, { Schema, Document } from "mongoose";

export interface StudyMaterials extends Document {
  title: string;
  driveUrl: string;
  userId: string;
}

const StudyMaterialsSchema = new Schema<StudyMaterials>({
  title: { type: String, required: true },
  driveUrl: { type: String, required: true },
    userId: { type: String, required: true },
});

const StudyMaterialsModel =
  (mongoose.models.StudyMaterials as mongoose.Model<StudyMaterials>) ||
  mongoose.model<StudyMaterials>("StudyMaterials", StudyMaterialsSchema);

export default StudyMaterialsModel;
