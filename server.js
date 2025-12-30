import express from "express";
import mysql from "mysql2/promise"; // use promise version
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.post("/contact-form", async (req, res) => {
  const { name, email, subject, message } = req.body;

  // Create a connection for this request
  const connection = await mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
  });

  try {
    const sql = "INSERT INTO contactform (name, email, subject, message) VALUES (?, ?, ?, ?)";
    await connection.execute(sql, [name, email, subject, message]);
    res.status(200).json({ message: "Form submitted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Database error" });
  } finally {
    await connection.end();
  }
});

export default app;
