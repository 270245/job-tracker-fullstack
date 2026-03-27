const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});

app.get("/jobs", (req, res) => {
  db.query("SELECT * FROM jobs", (err, result) => {
    if (err) return res.json(err);
    res.json(result);
  });
});

app.post("/jobs", (req, res) => {
  const { company, role, status } = req.body;

  db.query(
    "INSERT INTO jobs (company, role, status) VALUES (?, ?, ?)",
    [company, role, status],
    () => res.json("Added")
  );
});

app.listen(process.env.PORT || 5000, () => {
  console.log("Server running");
});
