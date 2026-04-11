import mongoose from "mongoose";
import argon2 from "argon2";

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: ["true", "Please provide an Email."],
      unique: true,
      lowercase: true,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, "Please provide a valid email"],
    },
    password: {
      type: String,
      required: ["true", "Please provide a Password."],
      minlength: 8,
      select: false,
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      deafult: "user",
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    authorizedApps: [
      {
        clientId: String,
        appName: String,
        linkedAt: { type: Date, default: Date.now },
      },
    ],
    LoginAttempts: { type: Number, default: 0 },
    LockUntil: { type: Number },
  },
  { timestamps: true },
);

userSchema.pre("save", async (next) => {
  if (!this.isModified("password")) return next();

  try {
    this.password = await argon2.hash(this.password);
    next();
  } catch (err) {
    next(err);
  }
});

userSchema.methods.comparePassword = async (receivedPassword) => {
  return await argon2.verify(this.password, receivedPassword);
};
const User = mongoose.model("User", userSchema);

export default User;
