import { Stack, Typography } from '@mui/material';
import Movie from "../movieCard";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { MoviesContext } from "../../contexts/moviesContext";
import { useContext } from "react";
import MasterIconList from "../cardIcons/masterList";
import { useQuery } from '@tanstack/react-query';
import { getRecommended } from '../../api/tmdb-api';
import Spinner from '../spinner';
import Paper from '@mui/material/Paper';
import MovieList from '../movieList'

const MediaRecommendations = ({ media, mediaType }) => {
    const { watchList : movieIds } = useContext(MoviesContext)
    const { data: recommended, error: recommendedError, isPending: recommendedIsPending, isError: recommendedIsError  } = useQuery({
        queryKey: ['recommended', {id: media.id, mediaType}],
        queryFn: getRecommended,
    })
    
    if (recommendedIsPending) {
        return <Spinner />;
    }
    if(recommendedIsError) {
        return <h1>{recommendedError.message}</h1>;
    }
    let recommendedMedia = recommended.map((media) => (
        <Box key={media.id} sx={{flexShrink: 0, width: "12vw"}}>
            <Movie movie={media} action={(media) => {
                return <MasterIconList movie={media} />
            }} />
        </Box>
    ))
    return (
        <>
            <Paper>
                <Typography variant="h5" component="h3" sx={{padding: "20px"}}>
                    Recommended {mediaType == "movie" ? "Movies" : "TV"}
                </Typography>
                <Stack direction="row" spacing = {2} sx={{overflowX: "scroll", padding: "5px"}}>
                    {recommendedMedia}
                </Stack>
            </Paper>
        </>
    )
};

export default MediaRecommendations;