const mongoose = require("mongoose");

const MessageShema = new mongoose.Schema(
  {
    senderId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    receiverId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    roomId: { type: String },
    message: { type: String },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Message", MessageShema);
