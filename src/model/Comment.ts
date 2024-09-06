import { Document, Model, model, models, Schema } from "mongoose";

export interface Comment extends Document {
  contentId: string;
  userId: string;
  comment: string;
  isApproved?: boolean;
}

const CommentSchema = new Schema<Comment>(
  {
    contentId: { type: String, required: true },
    userId: { type: String, required: true },
    comment: { type: String, required: true },
    isApproved: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const CommentModel =
  (models.Content as Model<Comment>) ||
  model<Comment>("Comment", CommentSchema);

export default CommentModel;
