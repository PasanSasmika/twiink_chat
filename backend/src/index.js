import express from "express";
import authRoutes from "./routes/auth.route.js";
import messageRoutes from "./routes/message.route.js";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import { connectDB } from "./lib/db.js";
import cors from "cors";



dotenv.config()
const app = express();

const PORT = process.env.PORT
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,
}))


app.use("/api/auth/", authRoutes)
app.use("/api/message/", messageRoutes)


app.listen(PORT, ()=> {
    console.log("Server is running on port:" + PORT );
connectDB()   
});