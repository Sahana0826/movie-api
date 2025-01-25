
import { Router } from "express";
import { fetchMovies } from "../controllers/movieController";

const router = Router();

// Directly use fetchMovies
router.get("/movies", fetchMovies);

export default router;
