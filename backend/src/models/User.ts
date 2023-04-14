import mongoose, { Schema, Document } from "mongoose";

const bcrypt = require("bcryptjs");

export enum UserRole {
  USER = "user",
  ADMIN = "admin",
}

export interface IUser extends Document {
  username: string;
  password: string;
  email: string;
  profilePic: string;
  friends: IUser[];
  role: UserRole;
  setPassword: (password: string) => Promise<void>;
  validatePassword: (password: string) => Promise<boolean>;
}

const UserSchema: Schema = new Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  profilePic: { type: String, default: "" },
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
  return bcrypt.compare(password, this.password);
};

export default mongoose.model<IUser>("User", UserSchema);
