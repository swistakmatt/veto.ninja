import mongoose, { Schema, Document, ObjectId } from "mongoose";

export enum GameName {
  VALORANT = "valorant",
  COUNTER_STRIKE = "counter_strike",
}

export interface IDraft extends Document {
  _id: ObjectId;
  gameName: GameName;
  draftOrder: string[];
  startingUser: string;
  teams: [
    {
      user: string;
      picks: string[];
      bans: string[];
    }
  ];
}

const TeamSchema: Schema = new Schema({
  user: { type: String, required: true },
  picks: [{ type: String, required: false }],
  bans: [{ type: String, required: false }],
});

const DraftSchema: Schema = new Schema({
  gameName: { type: String, enum: Object.values(GameName), required: true },
  draftOrder: { type: [String], required: false },
  startingUser: { type: String, required: true },
  teams: { type: [TeamSchema], required: true },
});

export default mongoose.model<IDraft>("Draft", DraftSchema);
