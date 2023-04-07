import React from "react";
import Header from "../headerMovieList";
import Grid from "@mui/material/Grid";
import MovieList from "../movieList";
import Paginator from "../pagination/paginator";
import { Typography } from "@mui/material";

const styles = {
  root: { 
    backgroundColor: "#bfbfbf",
  }
};

function MovieListPageTemplate({ movies, shows, baseUrl, isShow, isMovie, pageId, title, action, tvActions, paginationProps }) {
  // if (movies === undefined) {
  //   isMovie = false;
  // } else {
  //   isMovie = true;
  //   console.log("MovieListPageTemplate movies", movies.length);
  // }
  // if (shows === undefined){
  //   isShow = false;
  // } else {
  //   isShow = true;
  //   console.log("MovieListPageTemplate shows", shows.length);
  // }
  
  console.log("MovieListPageTemplate movies", movies);
  console.log("MovieListPageTemplate shows", shows);
  
  return (
    <>
      <Grid container sx={styles.root}spacing={5}>
        <Grid item xs={12}>
          <Header title={title}
                  pageId={pageId}
                  baseUrl={baseUrl} />
        </Grid>
        { isMovie ? (
          <Grid item container spacing={5}>
          <MovieList
            action={action}
            movies={movies}
            baseUrl={/movies/}
            isShow={false}
            isMovie={true}/>
        </Grid>
        ):(
          <></>
        )}
        
        { isShow ? (
          <Grid item container spacing={5}>
              <MovieList
                action={tvActions}
                movies={shows}
                baseUrl={/show/}
                isShow={true}
                isMovie={false}/>
          </Grid>
        ):(
          <></>
        )}
      </Grid>
      <Paginator props={paginationProps}
                 baseUrl={baseUrl}/>
    </>
  );
}
export default MovieListPageTemplate;
