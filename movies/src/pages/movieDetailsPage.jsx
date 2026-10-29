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

const MoviePage = (props) => {
  const { id } = useParams();
  const { data: movie, error, isPending, isError  } = useQuery({
    queryKey: ['movie', {id: id}],
    queryFn: getMovie,
  })

  const { data: recommended, error: recommendedError, isPending: recommendedIsPending, isError: recommendedIsError  } = useQuery({
    queryKey: ['recommended', {id: id}],
    queryFn: getRecommendedMovies,
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
        console.log(recommended),
        console.log(movie),
        <>
          <PageTemplate movie={movie}>
            <MovieDetails movie={movie} />
            <Divider />
            <MovieRecommendations results={recommended} />
          </PageTemplate>
        </>
      ) : (
        <p>Waiting for movie details</p>
      )}
    </>
  );
};

export default MoviePage;
