import React from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import {Stack, Typography} from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import { useNavigate } from "react-router";

const MediaHeader = ({media, mediaType}) => {
  const navigate = useNavigate();
  let title;
  if(mediaType === "movie"){
    title = media.title;
  }else{
    title = media.name;
  }
  return (
    <Paper 
        component="div" 
        sx={{
            display: "flex",
            justifyContent: "space-around",
            flexWrap: "wrap",
            padding: 1.5,
            margin: 0,
        }}
      >
      <IconButton aria-label="go back" onClick={() => navigate(-1)} >
        <ArrowBackIcon color="primary" fontSize="large" />
      </IconButton>
      <Stack direction="column">
        <Typography variant="h4" component="h3" align="center">
          <a href={media.homepage}>
            <HomeIcon color="primary" />
          </a>
          {title}
        </Typography>
        <Typography align="center">
          <span sx={{ fontSize: "0.1rem"}}>{`"${media.tagline}"`} </span>
        </Typography>
      </Stack>
      <IconButton aria-label="go forward" onClick={() => navigate(+1) } >
        <ArrowForwardIcon color="primary" fontSize="large" />
      </IconButton>
    </Paper>
    
  );
};

export default MediaHeader;
