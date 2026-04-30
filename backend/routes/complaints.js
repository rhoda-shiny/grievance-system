const express = require("express");
const router = express.Router();
const db = require("../db");

// 🟢 Add Complaint
router.post("/add", (req, res) => {
  const { student_id, category, description } = req.body;

  const sql = "INSERT INTO complaints (student_id, category, description) VALUES (?, ?, ?)";

  db.query(sql, [student_id, category, description], (err, result) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ message: "Error submitting complaint" });
    }
    res.json({ message: "Complaint submitted successfully" });
  });
});

// 🔵 Get All Complaints
router.get("/", (req, res) => {
  const sql = "SELECT * FROM complaints";

  db.query(sql, (err, result) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ message: "Error fetching complaints" });
    }
    res.json(result);
  });
});

// 🟡 Update Status
router.put("/update/:id", (req, res) => {
  const { status } = req.body;
  const id = req.params.id;

  const sql = "UPDATE complaints SET status=? WHERE complaint_id=?";

  db.query(sql, [status, id], (err, result) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ message: "Error updating status" });
    }
    res.json({ message: "Status updated successfully" });
  });
});

// 🔴 DELETE complaint (✅ FIXED)
router.delete("/:id", (req, res) => {
  const id = req.params.id;

  db.query(
    "DELETE FROM complaints WHERE complaint_id = ?",
    [id],
    (err, result) => {
      if (err) {
        console.log(err);
        return res.status(500).json({ message: "Error deleting complaint" });
      }

      res.json({ message: "Complaint deleted successfully" });
    }
  );
});

module.exports = router;