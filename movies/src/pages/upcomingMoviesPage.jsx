import React, { useState, useEffect } from "react";
import PageTemplate from '../components/templateMovieListPage'
import { getUpcomingMovies } from "../api/tmdb-api";
import { MoviesContext } from "../contexts/moviesContext";
import AddToWatchListIcon from "../components/cardIcons/addToWatchList";
import RemoveFromWatchListIcon from "../components/cardIcons/removeFromWatchList";
import { useContext } from "react";

const UpcomingMoviesPage = (props) => {
  const {watchList: watchListIds } = useContext(MoviesContext);
  const [movies, setMovies] = useState([]);
  

  const addToWatchList = (movieId) => {
    const updatedMovies = movies.map((m) =>
      m.id === movieId ? { ...m, watchlist: true } : m
    );
    setMovies(updatedMovies);
  };

  const removeFromWatchList = (movieId) => {
    const updatedMovies = movies.map((m) =>
      m.id === movieId ? { ...m, watchlist: false } : m
    );
    setMovies(updatedMovies);
  }

   useEffect(() => {
        getUpcomingMovies().then(movies => {
        setMovies(movies);
        });
    }, []);

  //   return (
  //   <PageTemplate
  //     title="Favorite Movies"
  //     movies={movies}
  //     action={(movie) => {
  //       return (
  //         <>
  //           <RemoveFromFavorites movie={movie} />
  //           <WriteReview movie={movie} />
  //         </>
  //       );
  //     }}
  //   />
  // );
  return (
    <PageTemplate
      title='Upcoming Movies'
      movies={movies}
      action={(movie) => {
        return (
          <>
          <AddToWatchListIcon movie={movie} />
          <RemoveFromWatchListIcon movie={movie} />
          </>
        );
      }}
    />
  );
};
export default UpcomingMoviesPage;
