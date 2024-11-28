import express from "express";
import authRoutes from "./routes/auth.route.js"
import dotenv from "dotenv";
import cookieParser from "cookie-parser";


dotenv.config()
const app = express();

const PORT = process.env.PORT
app.use(express.json());
app.use(cookieParser());


import { connectDB } from "./lib/db.js";
app.use("/api/auth/", authRoutes)

app.listen(PORT, ()=> {
    console.log("Server is running on port:" + PORT );
connectDB()   
});