import express from "express";
import dotenv from "dotenv";
import movieRoutes from "./routes/movieRoutes";

// Load environment variables
dotenv.config();

// Initialize Express app
const app = express();
const port = process.env.PORT || 3000;

// Use movie routes
app.use("/api", movieRoutes);

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
