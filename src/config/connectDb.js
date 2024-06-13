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
    useNewUrlParser: true,
    useUnifiedTopology: true,
  };
  try {
    const { connection } = await mongoose.connect(process.env.MONGO_CONNECTION_STRING, options);

    config.isConnected = connection.readyState;

    console.log("Connected to DB 💡💡💡");

  } catch (error) {
    console.log("Failed to connect DB::", error.message);
  }
};

export default connectToDB;
