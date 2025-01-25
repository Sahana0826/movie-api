
import axios from "axios";
import dotenv from "dotenv";
import {BASE_URL} from "../config/dotnev";

// Load environment variables
dotenv.config();

// Validate the API key at runtime
if (!process.env.API_KEY) {
  throw new Error("API_KEY is missing. Please set it in the .env file.");
}

// Create Axios instance with default configuration
export const apiClient = axios.create({

 baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  params: {
    api_key: process.env.API_KEY, // Add the API key as a query parameter for every request
  },
  timeout: 10000, // Set a timeout to prevent hanging requests
});

// Added interceptors for logging and error handling
apiClient.interceptors.request.use(
  (config) => {
    console.info(`[API Request] ${config.method?.toUpperCase()} ${config.url}`);
    return config;
  },
  (error) => {
    console.error("[API Request Error]", error.message);
    return Promise.reject(error);
  }
);

apiClient.interceptors.response.use(
  (response) => {
    console.info(`[API Response] ${response.status} ${response.config.url}`);
    return response;
  },
  (error) => {
    if (error.response) {
      // When Server responded with a status code outside the range of 2xx
      console.error(
        `[API Response Error] ${error.response.status} ${error.response.config.url}`,
        error.response.data
      );
    } else if (error.request) {
      // When request was made but no response received
      console.error("[API No Response]", error.message);
    } else {
      // Handling other errors during setup
      console.error("[API General Error]", error.message);
    }
    return Promise.reject(error);
  }
);
