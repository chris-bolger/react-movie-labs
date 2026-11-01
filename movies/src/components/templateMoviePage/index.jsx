import React, { useState, useEffect } from "react";
import MovieHeader from "../headerMovie";
import Grid from "@mui/material/Grid";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import { getMediaImages, getMovie } from "../../api/tmdb-api";
import { useQuery } from "@tanstack/react-query";
import Spinner from '../spinner'

const TemplateMoviePage = ({ movie, mediaType, children }) => {
  const { data, error, isPending, isError } = useQuery({
    queryKey: ['images', { id: movie.id, mediaType: mediaType}],
    queryFn: getMediaImages,
  });

  if (isPending) {
    return <Spinner />;
  }

  if (isError) {
    return <h1>{error.message}</h1>;
  }
  
  const images = data.posters 

  return (
    <>
      <MovieHeader media={movie} mediaType={mediaType} />

      <Grid container spacing={5} style={{ padding: "15px" }}>
        <Grid size={{xs: 3}}>
          {/* <div sx={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "space-around",
          }}> */}
              <ImageList sx={{ position: "sticky", top: 80, maxHeight:"80vh" }} cols={1} >
                {images.map((image) => (
                  <ImageListItem key={image.file_path} cols={1}>
                    <img
                      src={`https://image.tmdb.org/t/p/w500/${image.file_path}`}
                      alt={image.poster_path}
                    />
                  </ImageListItem>
                ))}
              </ImageList>
          {/* </div> */}
        </Grid>

        <Grid size={{xs: 9}}>
          {children}
        </Grid>
      </Grid>
    </>
  );
};

export default TemplateMoviePage;
