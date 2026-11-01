import React from "react";
import { Link } from "react-router";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import CardHeader from "@mui/material/CardHeader";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import FavoriteIcon from "@mui/icons-material/Favorite";
import CalendarIcon from "@mui/icons-material/CalendarTodayTwoTone";
import StarRateIcon from "@mui/icons-material/StarRate";
import Grid from "@mui/material/Grid";
import { useContext } from "react";
import { MoviesContext } from "../../contexts/moviesContext";
import { Divider } from "@mui/material";
import image from '../../images/film-poster-placeholder.png'
import MasterIconList from "../cardIcons/masterList";

export default function MovieCard({movie}) {
  const {mediaType, setMediaType} = useContext(MoviesContext);
  const { favorites, addToFavorites } = useContext(MoviesContext);
  const previewImage = movie.poster_path ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}` : image;
  if (favorites.find((id) => id === movie.id)) {
    movie.favorite = true;
  } else {
    movie.favorite = false
  }
  console.log(previewImage);
  const handleAddToFavorite = (e) => {
    e.preventDefault();
    addToFavorites(movie);
  };

  return (
    <Card elevation={2}>
        <CardHeader
            // avatar={
            //     movie.favorite ? (
            //     <Avatar sx={{ backgroundColor: 'red' }}>
            //         <FavoriteIcon />
            //     </Avatar>
            //     ) : null
            // }
            title={
                <Typography variant="h5" component="p" noWrap sx={{overflow: "hidden"}}>
                  {mediaType === "movie" ? movie.title : movie.name}
                </Typography>
            }
        />

      <CardMedia
        sx={{ aspectRatio: "2 / 3"}}
        image={previewImage}
      />
      <CardContent>
        <Grid container>
          <Grid size={{xs: 6}}>
            <Typography component="p">
              <CalendarIcon fontSize="small" />
              {mediaType === "movie" ? movie.release_date : movie.first_air_date}
            </Typography>
          </Grid>
          <Grid size={{xs: 6}}>
            <Typography component="p">
              <StarRateIcon fontSize="small" />
              {"  "} {movie.vote_average}{" "}
            </Typography>
          </Grid>
        </Grid>
      </CardContent>
      <CardActions sx={{ justifyContent: "space-between" }}>
        <MasterIconList movie={movie}/>
        <Divider orientation="vertical" variant="middle" flexItem/>
        <Link to={`/movies/${movie.id}`}>
          <Button variant="outlined" size="medium" color="primary">
            More Info ...
          </Button>
        </Link>
      </CardActions>
    </Card>
  );
}
