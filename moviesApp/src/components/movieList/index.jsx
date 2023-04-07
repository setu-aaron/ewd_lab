import React from "react";
import Movie from "../movieCard";
import Show from "../showCard/showCard";
import Grid from "@mui/material/Grid";

const MovieList = ( {movies, action, baseUrl, isShow, isMovie }) => {
  console.log("IsMovie", isMovie)
  console.log("IsShow", isShow)
  console.log("Movies", movies)
  let movieCards = movies.map((m) => (
    <>
      { isMovie ? (
        <Grid key={m.id} item xs={12} sm={6} md={4} lg={3} xl={2}>
          <Movie key={m.id} movie={m} action={action} baseUrl={baseUrl}/>
        </Grid> ) : (
        <Grid key={m.id} item xs={12} sm={6} md={4} lg={3} xl={2}>
          <Show key={m.id} show={m} action={action} baseUrl={baseUrl} />
        </Grid>
    )}
      
      </>
  ));
  return movieCards;
};

export default MovieList;
