import express from "express";
import { addToWatchList, getAllWatchLists, removeFromWatchList } from "../controllers/watchListController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";
const router = express.Router();

router.use(authMiddleware);
router.post("/", addToWatchList);
router.get("/", getAllWatchLists);
// With params: 
router.delete("/:id", removeFromWatchList);

export default router;