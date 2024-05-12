import mongoose from "mongoose";

// Func to connect to MongoDB
export const connectToMongoDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, { dbName: "BackendAPI" });
    console.log("Connected to MongoDb");
  } catch (err) {
    console.log(err);
  }
};
