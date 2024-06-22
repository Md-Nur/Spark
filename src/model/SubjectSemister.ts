import mongoose, { Document, Schema } from "mongoose";

export interface SubjectSemester extends Document {
  year: number;
  semester: string;
  isNewer: boolean;
  subjects: {
    name: string;
    teacher: {
      secA: string;
      secB: string;
    };
    code: string;
    credit: number;
    type: string;
  }[];
}

const SubjectSemesterSchema = new Schema({
  year: { type: Number, enum: { values: [1, 2, 3, 4] } },
  semester: { type: String, enum: { values: ["Even", "Odd"] } },
  isNewer: { type: Boolean, required: true },
  subjects: [
    {
      name: { type: String, required: true },
      teacher: {
        secA: { type: String },
        secB: { type: String },
      },
      code: { type: String, required: true },
      credit: { type: Number, required: true },
      type: {
        type: String,
        enum: { values: ["Theory", "Lab"] },
      },
    },
  ],
});

const SubjectSemesterModel =
  (mongoose.models.SubjectSemester as mongoose.Model<SubjectSemester>) ||
  mongoose.model<SubjectSemester>("SubjectSemester", SubjectSemesterSchema);

export default SubjectSemesterModel;
