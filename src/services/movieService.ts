
import { apiClient } from "../utils/apiClient";
import { Movie } from "../types/movieTypes";

// Fetch movies by year with optional pagination
export const getMoviesByYear = async (year: string, page: string = "1"): Promise<Movie[]> => {
  try {
    const response = await apiClient.get("/discover/movie", {
      params: {
        language: "en-US",
        page,
        primary_release_year: year,
        sort_by: "popularity.desc",
      },
    });

    const movies = await Promise.all(
      response.data.results.map(async (movie: any) => {
        const editors = await getMovieEditors(movie.id);
        return {
          title: movie.title,
          release_date: movie.release_date,
          vote_average: movie.vote_average,
          editors,
        };
      })
    );

    return movies;
  } catch (error: unknown) {
    handleServiceError(error, `Failed to fetch movies for year ${year}`);
    return [];
  }
};

// Fetch editors for a specific movie
const getMovieEditors = async (movieId: number): Promise<string[]> => {
  try {
    const response = await apiClient.get(`/movie/${movieId}/credits`);
    const crew = response.data.crew;

    return crew
      .filter((member: any) => member.known_for_department === "Editing")
      .map((editor: any) => editor.name);
  } catch (error: unknown) {
    handleServiceError(error, `Failed to fetch editors for movie ID ${movieId}`);
    return [];
  }
};

// Generic service error handler
const handleServiceError = (error: unknown, message: string): void => {
  if (error instanceof Error) {
    console.warn(`${message}: ${error.message}`);
  } else {
    console.warn(`${message}: An unknown error occurred.`);
  }
};

