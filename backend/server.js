require("dotenv").config();
const express = require("express");
const cors = require("cors");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Database connection
const db = require("./db");

// Routes
app.use("/api/auth", require("./routes/auth"));
app.use("/api/complaints", require("./routes/complaints"));

// Users API
app.get("/api/users", (req, res) => {
  db.query("SELECT user_id, name, email FROM users", (err, result) => {
    if (err) {
      console.error("Error fetching users:", err);
      return res.status(500).json({ message: "Error fetching users" });
    }
    res.json(result);
  });
});

// Root route (for testing deployment)
app.get("/", (req, res) => {
  res.send("🚀 Grievance Backend is Running");
});

// ✅ IMPORTANT: Use dynamic port (Render requirement)
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});