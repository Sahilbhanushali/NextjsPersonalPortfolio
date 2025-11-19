require("dotenv").config();
const express = require("express");
const cors = require("cors");
const sendEmailRouter = require("./sendEmail");

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json()); // Required for parsing JSON POST bodies

// Routes
app.use("/api", sendEmailRouter);

// Optional: Root route for testing
app.get("/", (req, res) => {
  res.send("🚀 Server is running!");
});

// Start the server
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
