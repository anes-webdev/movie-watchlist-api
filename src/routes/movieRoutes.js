import express from "express";
import { movies } from "../controllers/movieController.js";
const router = express.Router();

router.get("/", movies);

export default router;