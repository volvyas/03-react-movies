import axios from "axios";
import type { MovieResponse } from "../types/movie";

export default async function fetchMovies(
  query: string,
): Promise<MovieResponse> {
  const response = await axios.get<MovieResponse>(
    `https://api.themoviedb.org/3/search/movie`,
    {
      params: {
        api_key: import.meta.env.VITE_API_KEY,
        query,
      },
    },
  );
  return response.data;
}
