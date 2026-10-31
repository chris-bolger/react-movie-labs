import { useContext } from "react";
import { MoviesContext } from "../../contexts/moviesContext";
import PlaylistRemoveIcon from '@mui/icons-material/PlaylistRemove';
import IconButton from "@mui/material/IconButton";

const RemoveFromWatchListIcon = ({ movie }) => {
  const context = useContext(MoviesContext);

  const handleRemoveFromWatchList = (e) => {
    e.preventDefault();
    context.removeFromWatchList(movie);
  };

  return (
    <IconButton aria-label="remove from watchlist" onClick={handleRemoveFromWatchList}>
      <PlaylistRemoveIcon color="secondary" fontSize="large" />
    </IconButton>
  );
};

export default RemoveFromWatchListIcon;