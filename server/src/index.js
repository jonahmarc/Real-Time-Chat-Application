import express from "express";
import pg from "pg";
import dotenv from "dotenv";

dotenv.config();

const { Pool } = pg;
const app = express();
const port = process.env.PORT || 3001;

// PostgreSQL connection pool
const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
});

pool.connect()
    .then(() => console.log("Connected to PostgreSQL"))
    .catch((err) => console.error("Database connection error:", err));

app.get("/", async (req, res) => {
    try {
        const result = await pool.query("SELECT NOW()");
        res.json({ message: "Server is running", time: result.rows[0].now });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
