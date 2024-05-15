import mongoose from "mongoose";
import * as dotenv from "dotenv"; // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
dotenv.config();
const DATABASE = process.env.DATABASE;
const connection = async () => {
  const url = `${DATABASE}`;
  try {
    await mongoose.connect(DATABASE, { useNewUrlParser: true });
    console.log("database is connected");
  } catch (error) {
    console.log("error while connecting", error);
  }
};

export default connection;
