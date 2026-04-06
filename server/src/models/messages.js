import mongoose from "mongoose";

const messageSchema = new mongoose.Schema(
  {
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Links this message to a specific user
      required: [true, "A message must have a sender"],
    },
    content: {
      type: String,
      required: [true, "Message content cannot be empty"],
      trim: true,
      maxlength: [2000, "Message is too long"],
    },
    chatRoomId: {
      type: String,
      required: true,
      index: true, // Makes searching for messages in a specific room lightning fast
    },
    status: {
      type: String,
      enum: ["sent", "delivered", "read"],
      default: "sent",
    },
  },
  { timestamps: true },
);

// INDEXING: Helping MongoDB find the most recent messages first
messageSchema.index({ chatRoomId: 1, createdAt: -1 });

const Message = mongoose.model("Message", messageSchema);
export default Message;
