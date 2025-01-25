
import { Request, Response, NextFunction } from "express";
import { getMoviesByYear } from "../services/movieService";

// Fetch movies by year and page
export const fetchMovies = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const { year, page } = req.query;

  const yearParam = typeof year === "string" ? year : undefined;
  const pageParam = typeof page === "string" ? page : undefined;

  if (!yearParam) {
    res.status(400).json({ error: "Invalid or missing year parameter" });
    return;
  }

  try {
    const movies = await getMoviesByYear(yearParam, pageParam);
    res.json(movies);
  } catch (error) {
    next(error); // Pass the error to Express error-handling middleware
  }
};
