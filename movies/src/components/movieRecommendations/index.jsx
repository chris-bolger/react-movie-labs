import { Stack, Typography } from '@mui/material';
import Movie from "../movieCard";
import Box from "@mui/material/Box";
import { MoviesContext } from "../../contexts/moviesContext";
import { useContext } from "react";
import AddToWatchListIcon from "../cardIcons/addToWatchList";
import RemoveFromWatchListIcon from "../cardIcons/removeFromWatchList";
import { useQuery } from '@tanstack/react-query';
import { getRecommendedMovies } from '../../api/tmdb-api';
import Spinner from '../spinner';
import Paper from '@mui/material/Paper';

const MovieRecommendations = ({ movie }) => {
    const { watchList : movieIds } = useContext(MoviesContext)
    const { data: recommended, error: recommendedError, isPending: recommendedIsPending, isError: recommendedIsError  } = useQuery({
        queryKey: ['recommended', {id: movie.id}],
        queryFn: getRecommendedMovies,
    })
    
    if (recommendedIsPending) {
        return <Spinner />;
    }
    if(recommendedIsError) {
        return <h1>{recommendedError.message}</h1>;
    }
    let recommendedMovies = recommended.map((movie) => (
        <Box sx={{flexShrink: 0, maxWidth: "400px", minWidth: "400px"}} key={movie.id}>
            <Movie movie={movie} action={(movie) => movieIds.includes(movie.id) ? <RemoveFromWatchListIcon movie={movie} /> : <AddToWatchListIcon movie={movie} />} />
        </Box>
    ))
    return (
        <>
            <Paper depth={6}>
                <Typography variant="h5" component="h3" sx={{margin: "20px"}}>
                    Recommended Movies
                </Typography>
                <Stack direction="row" spacing = {2} sx={{overflowX: "auto", padding: "20px"}}>
                    {recommendedMovies}
                </Stack>
            </Paper>
        </>
    )
};

export default MovieRecommendations;