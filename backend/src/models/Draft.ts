import mongoose, { Schema, Document } from "mongoose";

export enum GameName {
  VALORANT = "valorant",
  COUNTER_STRIKE = "counter_strike",
}

export interface IDraft extends Document {
  gameName: GameName;
  teams: [
    {
      teamName: string;
      captain: string;
      picks: string[];
      bans: string[];
    }
  ];
}

const TeamSchema: Schema = new Schema({
  teamName: { type: String, required: true },
  captain: { type: Schema.Types.ObjectId, ref: "User", required: true },
  picks: [{ type: String, required: true }],
  bans: [{ type: String, required: true }],
});

const DraftSchema: Schema = new Schema({
  gameName: { type: String, enum: Object.values(GameName), required: true },
  teams: { type: [TeamSchema], required: true },
});

export default mongoose.model<IDraft>("Draft", DraftSchema);
