import mongoose from "mongoose";

const connectToMongoDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("🍃 Successfully Connected to the Mongo Database.");
  } catch (err) {
    console.error(`❌ Connection to MongoDB failed: `, err);
    process.exit(1);
  }
};

export default connectToMongoDB;
