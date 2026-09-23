import { Router } from "express";
import {
  addItem,
  getItem,
  listItem,
  removeItem,
} from "../controllers/admin.controller.js";
import { upload } from "../middlewares/multer.middleware.js";

const adminRouter = Router();

// POST: api/admin/add
adminRouter.post("/add", upload.array("images", 5), addItem);

// GET: api/admin/get
adminRouter.get("/item/:id", getItem);

// GET: api/admin/list
adminRouter.get("/list", listItem);

// DELETE: api/admin/remove/:id
adminRouter.delete("/remove/:id", removeItem);

export default adminRouter;
