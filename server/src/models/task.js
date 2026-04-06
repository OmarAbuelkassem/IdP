import mongoose from "mongoose";

const taskSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    item: {
      type: String,
      required: [true, "Item name is required"],
      trim: true,
    },
    price: {
      type: Number,
      default: 0,
      min: [0, "Price cannot be negative"],
    },
    category: {
      type: String,
      enum: ["personal", "work", "shopping", "health"],
      default: "personal",
    },
    routine: {
      type: String,
      enum: ["none", "daily", "weekly", "monthly"],
      default: "none",
    },
    isCompleted: {
      type: Boolean,
      default: false,
    },
    dueDate: {
      type: Date,
    },
  },
  { timestamps: true },
);

// VIRTUAL: Automatically calculate if a task is overdue
taskSchema.virtual("isOverdue").get(function () {
  if (!this.dueDate || this.isCompleted) return false;
  return new Date() > this.dueDate;
});

// Ensure virtuals are included when sending to frontend
taskSchema.set("toJSON", { virtuals: true });

const Task = mongoose.model("Task", taskSchema);
export default Task;
