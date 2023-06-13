import mongoose, { Schema, Document, ObjectId } from "mongoose";
import Draft, { IDraft } from "./Draft";

export interface IMatch extends Document {
  _id: ObjectId;
  date: Date;
  draft: IDraft;
  result: string;
  setResult: (result: string) => Promise<void>;
}

const MatchSchema: Schema = new Schema({
  date: { type: Date, required: true },
  draft: { type: Schema.Types.ObjectId, ref: "Draft", required: true },
  result: { type: String, required: false },
});

MatchSchema.methods.setResult = async function (result: string): Promise<void> {
  this.result = result;
  await this.save();
};

export default mongoose.model<IMatch>("Match", MatchSchema);
