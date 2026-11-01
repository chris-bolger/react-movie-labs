import { Stack, Typography } from '@mui/material';
import Movie from "../movieCard";
import Box from "@mui/material/Box";
import { MoviesContext } from "../../contexts/moviesContext";
import { useContext } from "react";
import MasterIconList from "../cardIcons/masterList";
import { useQuery } from '@tanstack/react-query';
import { getRecommended } from '../../api/tmdb-api';
import Spinner from '../spinner';
import Paper from '@mui/material/Paper';
import MovieList from '../movieList'

const MovieRecommendations = ({ movie }) => {
    const { watchList : movieIds } = useContext(MoviesContext)
    const {mediaType, setMediaType} = useContext(MoviesContext);
    const { data: recommended, error: recommendedError, isPending: recommendedIsPending, isError: recommendedIsError  } = useQuery({
        queryKey: ['recommended', {id: movie.id, mediaType}],
        queryFn: getRecommended,
    })
    
    if (recommendedIsPending) {
        return <Spinner />;
    }
    if(recommendedIsError) {
        return <h1>{recommendedError.message}</h1>;
    }
    let recommendedMovies = recommended.map((movie) => (
        <Box sx={{flexShrink: 0}} key={movie.id}>
            <Movie movie={movie} action={(movie) => {
                return <MasterIconList movie={movie} />
            }} />
        </Box>
    ))
    return (
        <>
            <Paper elevation={6}>
                <Typography variant="h5" component="h3" sx={{padding: "20px"}}>
                    Recommended Movies
                </Typography>
                <Stack direction="row" spacing = {2} sx={{overflowX: "auto", padding: "20px", height: "10%"}}>
                    {recommendedMovies}
                </Stack>
            </Paper>
        </>
    )
};

export default MovieRecommendations;