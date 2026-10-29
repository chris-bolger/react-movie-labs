import { Stack, Typography } from '@mui/material';
import Movie from "../movieCard";
import Box from "@mui/material/Box";
import { MoviesContext } from "../../contexts/moviesContext";
import { useContext } from "react";
import AddToWatchListIcon from "../cardIcons/addToWatchList";
import RemoveFromWatchListIcon from "../cardIcons/removeFromWatchList";

const MovieRecommendations = (props) => {
    const { watchList : movieIds } = useContext(MoviesContext)
    console.log("Movie IDs:", movieIds)
    let recommendedMovies = props.results.results.map((movie) => (
        <Box sx={{flexShrink: 0, maxHeight: "auto"}} key={movie.id}>
            <Movie movie={movie} action={(movie) => movieIds.includes(movie.id) ? <RemoveFromWatchListIcon movie={movie} /> : <AddToWatchListIcon movie={movie} />} />
        </Box>
    ))
    return (
        <>
            <Typography variant="h5" component="h3" sx={{margin: "20px"}}>
                Recommended Movies
            </Typography>
            <Stack direction="row" spacing = {2} sx={{overflowX: "auto", padding: "20px"}}>
                {recommendedMovies}
            </Stack>
        </>
    )
};
export default MovieRecommendations;