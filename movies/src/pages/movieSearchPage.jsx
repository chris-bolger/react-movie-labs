import React from "react";
import SearchBox from "../components/searchBox/searchBox";
import { searchMovies } from "../api/tmdb-api";
import { useQuery } from '@tanstack/react-query';
import MovieList from "../components/movieList";
import Grid from "@mui/material/Grid";
import AddToFavoritesIcon from '../components/cardIcons/addToFavorites'
import EmptyContent from "../components/emptyContent";
import Typography from "@mui/material/Typography";
import Header from "../components/headerMovieList";
import Box from "@mui/material/Box";

const MovieSearchPage = ( props, title ) => {
  const [searchTerm, setSearchTerm] = React.useState("");
  const { data, error, isPending, isError  } = useQuery({
    queryKey: ['search', {query: searchTerm}],
    queryFn: searchMovies,
    enabled: !!searchTerm, // Only run the query if searchTerm is not empty
  })

  return (
    <>
    <Grid container sx={{justifyContent: "center"}}>
      <Grid size={12}>
        <Header title="Search" />
      </Grid>
      <Grid size={{xs: 12, sm: 6, md: 4, lg: 3, xl: 2}} sx={{padding: "20px", margin: "20px"}}>
        <SearchBox onSearch={setSearchTerm}/>
        {isPending && <EmptyContent />}
        {isError && <h1>{error.message}</h1>}
      </Grid>
      {data && (
          <Grid container sx={{flex: "1 1 500px"}}>
            <MovieList movies={data} action={(movie) => {
              return <AddToFavoritesIcon movie={movie} />
            }} />
          </Grid>
        )}
    </Grid>
    </>
  );
};

export default MovieSearchPage;
