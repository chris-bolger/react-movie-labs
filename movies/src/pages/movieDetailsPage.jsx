import {react, useContext} from "react";
import { useParams } from 'react-router';
import MovieDetails from "../components/movieDetails/";
import PageTemplate from "../components/templateMoviePage";
import useMovie from "../hooks/useMovie";
import { getMedia } from '../api/tmdb-api'
import { useQuery } from '@tanstack/react-query';
import Spinner from '../components/spinner'
import Divider from '@mui/material/Divider';
import MovieRecommendations from "../components/mediaRecommendations";
import { MoviesContext } from "../contexts/moviesContext";

const MoviePage = (props) => {
  const {mediaType, setMediaType} = useContext(MoviesContext);
  const { id } = useParams();
  const { data: movie, error, isPending, isError  } = useQuery({
    queryKey: ['media', { id, mediaType }],
    queryFn: getMedia,
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
          <PageTemplate movie={movie} mediaType={mediaType}>
            <MovieDetails media={movie} mediaType={mediaType}/>
            <Divider sx={{ my: 2 }} />
          </PageTemplate>
        </>
      ) : (
        <p>Waiting for movie details</p>
      )}
    </>
  );
};

export default MoviePage;
