import mongoose, { Schema, Document } from "mongoose";

export interface User extends Document {
  name?: string;
  email?: string;
  roll: number;
  imgUrl?: string;
  session: string;
  hallCode?: number;
  registrationNo?: number;
  homeTown?: string;
  phone?: string;
  whatsapp?: string;
  telegram?: string;
  linkedin?: string;
  facebook?: string;
  pass: boolean;
  role: string;
}

const UserSchema = new Schema<User>({
  name: { type: String, required: false, trim: true },
  email: { type: String, required: false, trim: true },
  roll: { type: Number, required: true },
  imgUrl: { type: String, required: false },
  session: { type: String, required: true },
  hallCode: { type: Number },
  registrationNo: { type: Number },
  homeTown: { type: String },
  phone: { type: String },
  whatsapp: { type: String },
  telegram: { type: String },
  linkedin: { type: String },
  facebook: { type: String },
  pass: { type: Boolean, required: true },
  role: { type: String, enum: { values: ["Admin", "User"] }, default: "User" },
});

const UserModel =
  (mongoose.models.User as mongoose.Model<User>) ||
  mongoose.model<User>("User", UserSchema);

export default UserModel;
