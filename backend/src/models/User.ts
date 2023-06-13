import mongoose, { Schema, Document } from "mongoose";
import { ObjectId } from "mongodb";

const bcrypt = require("bcrypt");

export enum UserRole {
  USER = "USER",
  ADMIN = "ADMIN",
}

export interface IUser extends Document {
  _id: ObjectId;
  username: string;
  password: string;
  email: string;
  friends: IUser[];
  role: UserRole;
  setPassword: (password: string) => Promise<void>;
  validatePassword: (password: string) => Promise<boolean>;
}

const UserSchema: Schema = new Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  friends: [{ type: Schema.Types.ObjectId, ref: "User" }],
  role: { type: String, enum: Object.values(UserRole), default: UserRole.USER },
});

UserSchema.methods.setPassword = async function (
  password: string
): Promise<void> {
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(password, salt);
};

UserSchema.methods.validatePassword = async function (
  password: string
): Promise<boolean> {
  return await bcrypt.compare(password, this.password);
};

export default mongoose.model<IUser>("User", UserSchema);
