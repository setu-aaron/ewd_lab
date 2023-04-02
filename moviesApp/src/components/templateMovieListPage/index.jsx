import React from "react";
import Header from "../headerMovieList";
import Grid from "@mui/material/Grid";
import MovieList from "../movieList";
import Paginator from "../pagination/paginator";

const styles = {
  root: { 
    backgroundColor: "#bfbfbf",
  }
};

function MovieListPageTemplate({ movies, title, action, paginationProps }) {
  return (
    <>
      <Grid container sx={styles.root}>
        <Grid item xs={12}>
          <Header title={title} />
        </Grid>
        <Grid item container spacing={5}>
          <MovieList
            action={action}
            movies={movies}/>
        </Grid>
      </Grid>
      <Paginator props={paginationProps}/>
    </>
  );
}
export default MovieListPageTemplate;
