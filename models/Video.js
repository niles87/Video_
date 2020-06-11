const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const videoSchema = new Schema({
  title: { type: String },
  description: { type: String },
  src: { type: String },
  image: { type: String },
});

const Video = mongoose.model("Video", videoSchema);

module.exports = Video;
