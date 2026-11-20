import type { Movie, MovieResponse } from "../types/movie";
import css from "./App.module.css";
import ErrorMessage from "./ErrorMessage";
import Loader from "./Loader";
import MovieGrid from "./MovieGrid";
import MovieModal from "./MovieModal";
import SearchBar from "./SearchBar";
import axios from "axios";
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";

export default function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setError] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);

  const [movies, setMovies] = useState<Movie[]>([]);

  const onSubmit = async (query: string) => {
    if (!query) {
      toast.error("Please enter your search query.");
      return;
    }
    setIsLoading(true);
    setError(false);
    const response = await axios
      .get<MovieResponse>(`https://api.themoviedb.org/3/search/movie`, {
        params: {
          api_key: import.meta.env.VITE_API_KEY,
          query: query,
        },
      })
      .catch((error) => {
        setError(true);
      });

    if (!response) {
      return;
    }
    setIsLoading(false);
    setMovies(response.data.results);
    if (response.data.results.length === 0) {
      toast.error("No movies found for your request.");
    }
  };

  const onModalOpen = (movie: Movie) => {
    setSelectedMovie(movie);
    setIsModalOpen(true);
  };

  const onModalClose = () => {
    setSelectedMovie(null);
    setIsModalOpen(false);
  };

  return (
    <div className={css.container}>
      <Toaster />
      <SearchBar onSubmit={onSubmit} />
      {movies.length > 0 && (
        <MovieGrid movies={movies} onModalOpen={onModalOpen} />
      )}
      {isModalOpen && (
        <MovieModal movie={selectedMovie} onClose={onModalClose} />
      )}
      {isError && <ErrorMessage />}
      {isLoading && <Loader />}
    </div>
  );
}
