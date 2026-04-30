const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", require("./routes/auth"));
app.use("/api/complaints", require("./routes/complaints"));

// ✅ ADD USERS API HERE
const db = require("./db");

app.get("/api/users", (req, res) => {
  db.query("SELECT user_id, name, email FROM users", (err, result) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ message: "Error fetching users" });
    }
    res.json(result);
  });
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});