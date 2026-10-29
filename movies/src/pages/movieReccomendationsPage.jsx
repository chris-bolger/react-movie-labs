import React from "react";
import { useParams } from 'react-router';
import MovieDetails from "../components/movieDetails/";
import PageTemplate from "../components/templateMoviePage";
import useMovie from "../hooks/useMovie";
import { getMovie, getRecommendedMovies } from '../api/tmdb-api'
import { useQuery } from '@tanstack/react-query';
import Spinner from '../components/spinner'
import Divider from '@mui/material/Divider';
import MovieRecommendations from "../components/movieRecommendations";
import MovieCard from "../components/movieCard";
import AddToFavoritesIcon from '../components/cardIcons/addToFavorites'

const MovieRecommendationsPage = ( props ) => {
  const { id } = useParams();
  const { data: movie, error, isPending, isError  } = useQuery({
    queryKey: ['movie', {id: id}],
    queryFn: getMovie,
  })

  if (isPending) {
    return <Spinner />;
  }

  if (isError) {
    return <h1>{error.message}</h1>;
  }

  return (
    <>
      {movie ? (
        <>
          <PageTemplate movie={movie}>
            <MovieCard movie={movie} action={(movie) => <AddToFavoritesIcon movie={movie} />} />
            <Divider sx={{ my: 2 }} />
            <MovieRecommendations movie={movie} />
          </PageTemplate>
        </>
      ) : (
        <p>Waiting for movie details</p>
      )}
    </>
  );
};

export default MovieRecommendationsPage;
