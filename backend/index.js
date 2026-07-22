// import express from "express";
// import mongoose from "mongoose";
// import cors from "cors";
// import dotenv from "dotenv";
// import songRoutes from "./routes/songRoutes.js";

// dotenv.config();

// const app = express();
// app.get("/test", (req, res) => {
//   res.send("Backend working");
// });

// // ✅ CORS must be first
// app.use(
//   cors({
//     origin: "http://localhost:5173",
//     methods: ["GET", "POST", "PUT", "DELETE"],
//     credentials: true,
//   })
// );

// // ✅ Body parsers
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

// // ✅ Serve uploaded files
// app.use("/uploads", express.static("uploads"));

// // ✅ Routes
// app.use("/api", songRoutes);

// // ✅ MongoDB
// mongoose
//   .connect(process.env.MONGO_URI)
//   .then(() => console.log("MongoDB connected"))
//   .catch((err) => console.log(err));

// app.listen(5000, () => console.log("Server running on port 5000"));
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import songRoutes from "./routes/songRoutes.js";
import albumRoutes from "./routes/albumRoutes.js";

dotenv.config();

const app = express();

/* 🔥 Test route */
app.get("/", (req, res) => {
  res.send("PinkWave backend running");
});

/* 🔥 CORS for local + Vercel */
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://vyloxx.vercel.app",
    ],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

/* 🔥 Body parser */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/* 🔥 Routes */
app.use("/api/albums", albumRoutes);
app.use("/api", songRoutes);

/* 🔥 MongoDB */
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

/* 🔥 Dynamic port for Render */
const PORT = process.env.PORT || 5000;

app.listen(PORT, () =>
  console.log(`Server running on port ${PORT}`)
);