import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import userRoutes from "./routes/userRoutes.js";

// app expressing it self
const app = express();

// Middleware for parsing request body
app.use(express.json());

// for importing env details
dotenv.config();

// makes all user routes active
app.use("/user", userRoutes);

// used to connect to database
async function connectToDatabase() {
  try {
    await mongoose.connect(`${process.env.MONGODB_URL}`);
    app.listen(`${process.env.PORT}` || 5000, () => {
      console.log(`App is listening to port: ${process.env.PORT}`);
    });
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
}

connectToDatabase();
