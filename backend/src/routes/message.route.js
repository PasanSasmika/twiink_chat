import express from "express";
import { protectRoute } from "../middleware/auth.middleware.js";
import { getMessages, getUsersForSidebar, sendMessage } from "../controller/message.controler.js";



const router = express.Router();

router.get("/users",protectRoute, getUsersForSidebar)
router.get("/:id", protectRoute, getMessages)

router.get("/send/:id", protectRoute, sendMessage)


export default router;