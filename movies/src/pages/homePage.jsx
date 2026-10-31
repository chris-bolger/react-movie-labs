import { getMovies } from "../api/tmdb-api";
import PageTemplate from '../components/templateMovieListPage';
import { useQuery } from '@tanstack/react-query';
import Spinner from '../components/spinner';
import AddToFavoritesIcon from '../components/cardIcons/addToFavorites'
import MasterIconList from '../components/cardIcons/masterList'
import { MoviesContext } from "../contexts/moviesContext";
import {React, useState, useContext} from "react";

const HomePage = (props) => {
  const {mediaType, setMediaType} = useContext(MoviesContext);
  const { data, error, isPending, isError  } = useQuery({
    queryKey: ['discover', { mediaType }],
    queryFn: getMovies,
  })
  
  if (isPending) {
    return <Spinner />
  }

  if (isError) {
    return <h1>{error.message}</h1>
  }  
  
  const movies = data.results;
  console.log(movies);
  // Redundant, but necessary to avoid app crashing.
  const favorites = movies.filter(m => m.favorite)
  localStorage.setItem('favorites', JSON.stringify(favorites))
  const addToFavorites = (movieId) => true 

  return (
    <PageTemplate
      title="Discover Movies"
      movies={movies}
      action={(movie) => {
        return <MasterIconList movie={movie} />
      }}
    />
  );
};
export default HomePage;
