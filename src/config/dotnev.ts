import * as dotenv from "dotenv";
dotenv.config();

export const API_KEY = process.env.API_KEY || "";
export const BASE_URL = "https://api.themoviedb.org/3";
