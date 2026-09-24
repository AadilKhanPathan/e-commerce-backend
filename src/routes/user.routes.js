import { Router } from "express";
import { getItemByCategory } from "../controllers/user.controller.js";


const userRouter = Router();

// GET: api/user/category
userRouter.get("/category/:category", getItemByCategory)

export default userRouter;