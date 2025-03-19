import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import pkg from 'pg';
const { Pool } = pkg;

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;
const JWT_SECRET = process.env.JWT_SECRET;

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
});

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: [
        process.env.DEVELOPMENT_URL,
        process.env.LIVE_URL,
    ],
    credentials: true,
}));

// Helper function to authenticate users
const authenticate = (req, res, next) => {
    const token = req.cookies.token;
    if (!token) return res.status(401).json({ message: "Unauthorized" });
    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        req.user = decoded;
        next();
    } catch (err) {
        return res.status(403).json({ message: "Invalid token" });
    }
};

// Register a new user
app.post("/register", async (req, res) => {
    const { username, password } = req.body;
    try {
        // Validate input
        if (!username || !password) {
            throw new Error("Missing credentials");
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const result = await pool.query(
        "INSERT INTO users (username, password_hash) VALUES ($1, $2) RETURNING id, username",
        [username, hashedPassword]
        );

        return res.status(201).json({
            status: "success",
            data: result.rows[0],
            message: "User created successfully"
        });
    } catch (error) {
        console.error(error);
        return res.status(400).json({
            status: "error",
            error: {
                code: "BAD_REQUEST",
                message: "Invalid input or request."
            },
            message: error.message
        });
    }
});

// Login user
app.post("/login", async (req, res) => {
    const { username, password } = req.body;
    try {
        const result = await pool.query("SELECT * FROM users WHERE username = $1", [username]);
        if (result.rows.length === 0) {
            return res.status(401).json({
                status: "error",
                error: {
                    code: "UNAUTHORIZED",
                    message: "Authentication required."
                },
                message: "Invalid Credentials."
            });
        }

        const user = result.rows[0];
        const isMatch = await bcrypt.compare(password, user.password_hash);
        if (!isMatch) {
            return res.status(401).json({
                status: "error",
                error: {
                    code: "UNAUTHORIZED",
                    message: "Authentication required."
                },
                message: "Invalid Credentials."
            });
        }

        const token = jwt.sign({ id: user.id, username: user.username }, JWT_SECRET, { expiresIn: "1h" });
        res.cookie(
            "token", token,
            {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                sameSite: "Lax"
            }
        );
        return res.status(200).json({
            status: "success",
            data: [],
            message: "User logged in successfully"
        });
    } catch (error) {
        console.error(error);
        res.status(400).json({
            status: "error",
            error: {
                code: "BAD_REQUEST",
                message: "Invalid input or request."
            },
            message: error.message
        });
    }
});

// get all usernames
app.get("/users", async (req, res) => {
    try {
        const result = await pool.query("SELECT username FROM users");
        return res.status(200).json({
            status: "success",
            data: result.rows,
            message: "Usernames fetched successfully"
        });
    } catch (error) {
        console.error(error);
        return res.status(401).json({
            status: "error",
            error: {
                code: "UNAUTHORIZED",
                message: "Authentication required."
            },
            message: error.message
        });
    }
});

// Protected route
app.get("/protected", authenticate, (req, res) => {
    res.json({ message: "You have access to this protected route", user: req.user });
});

// Insert sample messages
app.post("/insert-messages", async (req, res) => {
    try {
        await pool.query("INSERT INTO messages (sender_id, receiver_id, message) VALUES ($1, $2, $3)", [1, 2, "Hello Bob!"]);
        await pool.query("INSERT INTO messages (sender_id, receiver_id, message) VALUES ($1, $2, $3)", [2, 1, "Hey Alice!"]);
        return res.json({ message: "Sample messages inserted" });
    } catch (err) {
        return res.status(500).json({ error: "Error inserting messages" });
    }
});

// Logout user
app.post("/logout", (req, res) => {
    res.clearCookie(
        "token",
        {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "Lax"
        }
    );
    res.status(200).json({
        status: "success",
        data: [],
        message: "User logged out successfully"
    });
});

// Start server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
