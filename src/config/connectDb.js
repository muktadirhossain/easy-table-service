import CONSTANTS from "@/assets/constants";
import mongoose from "mongoose";

const config = {
  isConnected: 0,
};

const connectToDB = async () => {
  // Check if already connected to DB::
  if (config.isConnected) {
    return;
  }

  const options = {
    dbName: "ets",
  };
  try {
    if(!CONSTANTS.MONGO_CONNECTION_STRING){
      throw new Error("No database connection string !!!")
    }
    const { connection } = await mongoose.connect(CONSTANTS.MONGO_CONNECTION_STRING, options);

    config.isConnected = connection.readyState;

    console.log("Connected to DB 💡💡💡");

  } catch (error) {
    console.log("Failed to connect DB::", error.message);
    throw new Error("Error connecting to DB ☠️☠️💀")
  }
};

export default connectToDB;
