import mongoose from "mongoose";

// MongoDB connection function
const connectMongoDB = async () => {
  try {
    // Check if already connected
    if (mongoose.connections[0].readyState) {
      return;
    }

    // Connect to MongoDB Atlas
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Connected to MongoDB Atlas");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
};

export default connectMongoDB;
