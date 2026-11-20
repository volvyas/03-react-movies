import fetchMovies from "../../services/movieService";
import type { Movie } from "../../types/movie";
import css from "./App.module.css";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import Loader from "../Loader/Loader";
import MovieGrid from "../MovieGrid/MovieGrid";
import MovieModal from "../MovieModal/MovieModal";
import SearchBar from "../SearchBar/SearchBar";

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
    setMovies([]);
    try {
      const data = await fetchMovies(query);
      setMovies(data.results);
      if (data.results.length === 0) {
        toast.error("No movies found for your request.");
      }
    } catch {
      setError(true);
    } finally {
      setIsLoading(false);
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
      {isLoading && !isError && <Loader />}
    </div>
  );
}
