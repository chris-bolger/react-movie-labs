import { MoviesContext } from "../../contexts/moviesContext";
import { useContext } from "react";
import Grid from "@mui/material/Grid";
import AddToFavoritesIcon from "./addToFavorites";
import RemoveFromFavoritesIcon from "./removeFromFavorites";
import AddToWatchListIcon from "./addToWatchList";
import RemoveFromWatchListIcon from "./removeFromWatchList";

const MasterIconList = ({ movie }) => {
    const { favorites, watchList } = useContext(MoviesContext);
    return (
        <>
            <Grid container sx={{ justifyContent: "space-between" }}>
                {favorites.find((id) => id === movie.id) ? (
                    <Grid>
                        <RemoveFromFavoritesIcon movie={movie} />
                    </Grid>
                ) : (
                    <Grid>
                        <AddToFavoritesIcon movie={movie} />
                    </Grid>
                )}
                {watchList.find((id) => id === movie.id) ? (
                    <Grid>
                        <RemoveFromWatchListIcon movie={movie} />
                    </Grid>
                ) : (
                    <Grid>
                        <AddToWatchListIcon movie={movie} />
                    </Grid>
                )}
            </Grid>
        </>
    );
};

export default MasterIconList;