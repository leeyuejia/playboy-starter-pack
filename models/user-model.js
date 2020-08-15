const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    _id: mongoose.Schema.Types.ObjectId,
    username: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true
    },
    profileImg: String,
    profileBio: String,
    password: {
      type: String,
      required: true
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("User", userSchema);