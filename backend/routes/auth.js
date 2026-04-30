const express = require("express");
const router = express.Router();
const db = require("../db");

// 🟢 REGISTER
router.post("/register", (req, res) => {
  const { name, email, password, role } = req.body;

  const sql = "INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)";
  
  db.query(sql, [name, email, password, role], (err, result) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ message: "Error registering user" });
    }
    res.json({ message: "User registered successfully" });
  });
});

// 🔵 LOGIN
router.post("/login", (req, res) => {
  const { email, password } = req.body;

  const sql = "SELECT * FROM users WHERE email=? AND password=?";
  
  db.query(sql, [email, password], (err, result) => {
    if (err) {
      return res.status(500).json({ message: "Error logging in" });
    }

    if (result.length > 0) {
      res.json(result[0]);
    } else {
      res.status(401).json({ message: "Invalid credentials" });
    }
  });
});

module.exports = router;