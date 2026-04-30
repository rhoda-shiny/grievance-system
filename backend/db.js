const mysql = require("mysql2");

const db = mysql.createConnection({
  host: process.env.DB_HOST,        // Railway host
  user: process.env.DB_USER,        // root
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,    // railway
  port: process.env.DB_PORT,        // 24870
  ssl: {
    rejectUnauthorized: false
  }
});

db.connect((err) => {
  if (err) {
    console.error("❌ Database connection failed:", err);
  } else {
    console.log("✅ Connected to Railway MySQL");
  }
});

module.exports = db;