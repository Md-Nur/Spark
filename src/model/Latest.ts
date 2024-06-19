import mongoose, { Schema, Document } from "mongoose";

export interface Latest extends Document {
  year: number;
  semester: string;
}

const LatestSchema = new Schema<Latest>({
  year: { type: Number, required: true },
  semester: { type: String, enum: { values: ["Odd", "Even"] } },
});

const LatestModel =
  (mongoose.models.Latest as mongoose.Model<Latest>) ||
  mongoose.model<Latest>("Latest", LatestSchema);

export default LatestModel;
