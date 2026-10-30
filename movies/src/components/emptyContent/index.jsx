
import React from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";

export default function EmptyContent(props){
  return (
    <Box display="flex" sx={{ justifyContent: "center", alignItems: "center", minHeight: "100vh" }}>
        <Paper elevation={3} sx={{ padding: "20px", textAlign: "center" }}>
            <Typography variant="h4" component="h2" gutterBottom>
                No content available
            </Typography>
            <Typography variant="body1" gutterBottom>
                Please check back later or try a different search.
            </Typography>
        </Paper>
    </Box>
  );
};