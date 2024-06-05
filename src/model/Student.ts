import mongoose, { Schema, Document } from "mongoose";

export interface Student extends Document {
  name?: string;
  roll: number;
  imgUrl?: string;
  session: string;
  year: number;
  semester: string;
  ygpa: number;
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

const StudentSchema = new Schema<Student>({
  name: { type: String, required: false, trim: true },
  roll: { type: Number, required: true },
  imgUrl: { type: String, required: false },
  session: { type: String, required: true },
  year: { type: Number, required: true },
  semester: { type: String, enum: { values: ["Even", "Odd"] } },
  // semester: { type: String },
  ygpa: { type: Number, required: true },
  credit: { type: Number, required: true },
  pass: { type: Boolean, required: true },
  subjects: [
    {
      name: { type: String, required: true },
      code: { type: String, required: true },
      credit: { type: Number, required: true },
      grade: { type: String, required: true },
      sgpa: { type: Number, required: true },
      // type: { type: String },
      type: { type: String, enum: { values: ["Theory", "Lab"] } },
      pass: { type: Boolean, required: true },
      improvement: { type: Boolean, required: false },
    },
  ],
});

const StudentModel =
  (mongoose.models.Student as mongoose.Model<Student>) ||
  mongoose.model<Student>("Student", StudentSchema);

export default StudentModel;
