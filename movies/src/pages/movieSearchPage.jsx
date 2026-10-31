import React from "react";
import SearchBox from "../components/searchBox/searchBox";
import { searchMovies } from "../api/tmdb-api";
import { useQuery } from '@tanstack/react-query';
import MovieList from "../components/movieList";
import Grid from "@mui/material/Grid";
import MasterIconList from "../components/cardIcons/masterList";
import EmptyContent from "../components/emptyContent";
import Header from "../components/headerMovieList";
import Spinner from "../components/spinner";
import { useParams, useNavigate } from "react-router";

const MovieSearchPage = ( props ) => {
  const { query } = useParams()
  const navigate = useNavigate()
  const { data, isPending, isError, error } = useQuery({
    queryKey: ['search', { query }],
    queryFn: searchMovies,
    enabled: !!query,
  });

  return (
    <>
    <Grid container sx={{justifyContent: "center"}}>
      <Grid size={12}>
        <Header title="Search For Movies" />
      </Grid>
      <Grid size={{xs: 12, sm: 6, md: 4, lg: 3, xl: 2}} sx={{padding: "20px", margin: "20px", position: "sticky", top: "80px"}}>
        <SearchBox onSearch={(query) => navigate(`/movies/search/${query}`)} />
      </Grid>
      <Grid size={12} sx={{padding: "20px", margin: "20px"}}>
        {!query && <EmptyContent title="Search for a movie" subtitle="Please enter a search term to find movies from TMDB." />}
        {query && isPending && <EmptyContent title="Fetching results..."/>}
        {isError && <EmptyContent title="Error" subtitle={error.message} />}
        {data && data.length > 0 && (
            <Grid container sx={{flex: "1 1 500px"}}>
              <MovieList movies={data} action={(movie) => {
                return <MasterIconList movie={movie} />
              }} />
            </Grid>
          )}
        {data && data.length === 0 && <EmptyContent title="No results found" subtitle="Try searching for something else!" />}
        </Grid>
    </Grid>
    </>
  );
};

export default MovieSearchPage;
