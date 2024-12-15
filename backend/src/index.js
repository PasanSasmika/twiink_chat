import express from "express";
import authRoutes from "./routes/auth.route.js";
import messageRoutes from "./routes/message.route.js";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import { connectDB } from "./lib/db.js";
import cors from "cors";
import bodyParser from 'body-parser';




dotenv.config()
const app = express();

app.use(bodyParser.json({ limit: '10mb' })); // Increase limit for JSON payloads
app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }));

const PORT = process.env.PORT
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin:"http://localhost:5173" ,
    credentials: true,
}))


app.use("/api/auth", authRoutes)
app.use("/api/messages", messageRoutes)


app.listen(PORT, ()=> {
    console.log("Server is running on port:" + PORT );
connectDB()   
});