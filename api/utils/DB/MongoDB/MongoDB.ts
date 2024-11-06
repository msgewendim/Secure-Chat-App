import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const mongoUri = process.env.MONGO_URI as string;
const connectToDB = async () => {
  try {
    // connect to mongoDB
    await mongoose.connect(mongoUri);
    console.log("connected to the mongodb");
  } catch (error) {
    console.log(error);
  }
};

export default connectToDB;
