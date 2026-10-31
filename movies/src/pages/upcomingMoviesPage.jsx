import React, { useState, useEffect } from "react";
import { useQuery } from '@tanstack/react-query';
import PageTemplate from '../components/templateMovieListPage'
import { getUpcomingMedia } from "../api/tmdb-api";
import { MoviesContext } from "../contexts/moviesContext";
import MasterIconList from "../components/cardIcons/masterList";
import { useContext } from "react";
import Spinner from "../components/spinner";

const UpcomingMoviesPage = (props) => {
  const {mediaType, setMediaType} = useContext(MoviesContext);
  const [movies, setMovies] = useState([]);
  const { data, error, isPending, isError  } = useQuery({
    queryKey: ['upcoming', { mediaType }],
    queryFn: getUpcomingMedia,
  })
  const title = mediaType === "movie" ? "Upcoming Movies" : "Airing TV Shows"
  if (isPending) {
    return <Spinner />
  }

  if (isError) {
    return <h1>{error.message}</h1>
  }  
  
  //  useEffect(() => {
  //       getUpcomingMedia(['upcoming', { mediaType }]).then(movies => {
  //       setMovies(movies);
  //       });
  //   }, []);

  return (
    <PageTemplate
      title={title}
      movies={data}
      action={(movie) => {
        return <MasterIconList movie={movie} />
      }}
    />
  );
};
export default UpcomingMoviesPage;
