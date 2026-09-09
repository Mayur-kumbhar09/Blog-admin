require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");

const app = express();

/* ================= CORS ================= */
app.use(
  cors({
    origin: "http://localhost:5173", // Keep 5173 for Vite, or change to 3000 for standard React
    credentials: true
  })
);

/* ================= BODY PARSER ================= */
app.use(express.json());

/* ================= LOGGING ================= */
app.use((req, res, next) => {
  console.log(req.method, req.url);
  next();
});

app.get("/", (req, res) => {
  res.send("🚀 Welcome to the Server API! The server is running successfully.");
});

/* ================= STATIC FILES ================= */
// This allows your frontend to read files directly if using "Option 2"
app.use("/profileimg", express.static(path.join(__dirname, "src", "profileimg")));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

/* ================= ROUTES ================= */
app.use("/api/auth", require("./src/routes/auth.routes"));
app.use("/api/posts", require("./src/routes/post.routes"));
app.use("/api/save-content", require("./src/routes/content.routes"));
app.use("/api/upload", require("./src/routes/upload.routes"));
app.use("/api/serverdata", require("./src/routes/server.routes"));
app.use("/api/profiledata", require("./src/routes/profile.routes"));

/* ================= START SERVER ================= */
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
