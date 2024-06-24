import mongoose, { Schema, Document } from "mongoose";

export interface Content extends Document {
  title: string;
  thumbnail: string;
  tags: string[];
  type: string;
  content: string;
  userId: string;
  isApproved?: boolean;
}

const ContentSchema = new Schema<Content>(
  {
    title: { type: String, required: true },
    thumbnail: { type: String, required: true },
    tags: { type: [String], required: true },
    type: { type: String, enum: { values: ["blog", "event", "tour"] } },
    content: { type: String, required: true },
    userId: { type: String, required: true },
    isApproved: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const ContentModel =
  (mongoose.models.Content as mongoose.Model<Content>) ||
  mongoose.model<Content>("Content", ContentSchema);

export default ContentModel;
