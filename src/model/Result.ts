import mongoose, { Schema, Document } from "mongoose";

export interface Result extends Document {
  user_id: string;
  year: number;
  semester: string;
  sgpa: number;
  credit: number;
  pass: boolean;
  subjects: {
    name: string;
    code: string;
    credit: number;
    grade: string;
    sgpa: number;
    type: string;
    pass: boolean;
    improvement: boolean;
  }[];
}

const ResultSchema = new Schema<Result>({
  user_id: { type: String, required: true },
  year: { type: Number, required: true },
  semester: { type: String, enum: { values: ["Even", "Odd"] } },
  sgpa: { type: Number, required: true },
  credit: { type: Number, required: true },
  pass: { type: Boolean, required: true },
  subjects: [
    {
      name: { type: String, required: true },
      code: { type: String, required: true },
      credit: { type: Number, required: true },
      grade: { type: String, required: true },
      sgpa: { type: Number, required: true },
      type: { type: String, enum: { values: ["Theory", "Lab"] } },
      pass: { type: Boolean, required: true },
      improvement: { type: Boolean, required: false },
    },
  ],
});

const ResultModel =
  (mongoose.models.Result as mongoose.Model<Result>) ||
  mongoose.model<Result>("Result", ResultSchema);

export default ResultModel;
