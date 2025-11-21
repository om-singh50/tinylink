import express from "express";
import {
  createLink,
  getLinks,
  getLinkStats,
  deleteLink,
} from "../controllers/linkController.js";

const router = express.Router();

router.post("/", createLink);
router.get("/", getLinks);
router.get("/:code", getLinkStats);
router.delete("/:code", deleteLink);

export default router;
