import mongoose, { Document, Schema } from "mongoose";

export interface SubjectSemister extends Document {
  year: number;
  semister: string;
  isNew: boolean;
  subjects: {
    name: string;
    code: string;
    credit: number;
    type: string;
  }[];
}

const SubjectSemisterSchema = new Schema<SubjectSemister>({
  year: { type: Number, enum: { values: [1, 2, 3, 4] } },
  semister: { type: String, enum: { values: ["Even", "Odd"] } },
  isNew: { type: Boolean, required: true },
  subjects: [
    {
      name: { type: String, required: true },
      code: { type: String, required: true },
      credit: { type: Number, required: true },
      type: {
        type: String,
        enum: { values: ["Theory", "Lab"] },
      },
    },
  ],
});

const SubjectSemisterModel =
  (mongoose.models.SubjectSemister as mongoose.Model<SubjectSemister>) ||
  mongoose.model<SubjectSemister>("SubjectSemister", SubjectSemisterSchema);

export default SubjectSemisterModel;
