import express from "express";
import authRoutes from "./routes/auth.route.js"
import dotenv from "dotenv";


dotenv.config()
const app = express();

const PORT = process.env.PORT
app.use(express.json());


import { connectDB } from "./lib/db.js";
app.use("/api/auth/", authRoutes)

app.listen(PORT, ()=> {
    console.log("Server is running on port:" + PORT );
connectDB()   
});