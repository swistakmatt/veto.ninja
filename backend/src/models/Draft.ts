import mongoose from "mongoose";

const DraftSchema = new mongoose.Schema({
  title: String,
  content: String,
});

const DraftModel = mongoose.model("Draft", DraftSchema);

export default DraftModel;
