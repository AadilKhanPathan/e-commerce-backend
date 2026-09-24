import dns from "dns";
dns.setServers(['8.8.8.8', '8.8.4.4']);
import "dotenv/config";

import express from "express";
import cors from "cors";
import connectDB from "./src/db/connectDB.js";
// import seedDB from "./src/db/seed.js";

import adminRouter from "./src/routes/admin.routes.js";
import userRouter from "./src/routes/user.routes.js";


const app = express();

// CORS configuration
app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  }),
);

// Middleware
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));

// Test route
app.get("/", (req, res) => {
  res.send("Hello, Express!");
});

app.use("/api/admin", adminRouter)
app.use("/api/user", userRouter)

connectDB();
// seedDB();

// Start server
app.listen(process.env.PORT, () => {
  console.log(`Server is running on http://localhost:${process.env.PORT}`);
});
