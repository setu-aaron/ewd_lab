import React,{useEffect, useState} from "react";
import Movie from "../movieCard";
import Show from "../showCard/showCard";
import Grid from "@mui/material/Grid";
import { supabase } from "../../supabaseClient";

const MovieList = ( {movies, action, baseUrl, isShow, isMovie, favoriteChanged}) => {

  const [favourites, setFavourites] = useState([]);
  const [ needsQuery, setNeedsQuery ] = useState(true);
  const [isQuerying, setIsQuerying] = useState(true);

  useEffect(() => {
    async function queryTable() {
      const {data: { session },} = await supabase.auth.getSession()   
      if (session){
        //console.log("MC: session: ", session)
      } else {
        //console.log("MC: session is null");
      }

      let tableName = isMovie ? 'favoriteMovies' : 'favoriteShows';
      let idName = isMovie ? 'movieId' : 'showId';
      console.log("ML: calling queryTable");
      let { data: favoriteMovies, error } = await supabase
      .from(tableName)
      .select(idName)
      .eq('userId', session.user.id)
      if (isMovie){
        setFavourites(favoriteMovies.map((m) => m.movieId));
      }
      if (isShow){
        setFavourites(favoriteMovies.map((m) => m.showId));
      }
      setIsQuerying(false);
    }
    if (needsQuery){
      queryTable();
      setNeedsQuery(false);
      setIsQuerying(true);
    }
  }, [needsQuery])
  useEffect(() => {
    if (favoriteChanged){
      setNeedsQuery(true);
    }
  }, [favoriteChanged])

  console.log("ML: isMovie: ", isMovie)
  console.log("ML: isShow: ", isShow)
  let movieCards = movies.map((m) => (
    <>
      { isMovie ? (
        <Grid key={m.id} item xs={12} sm={6} md={4} lg={3} xl={2}>
          <Movie  key={m.id} 
                  movie={m} 
                  action={action} 
                  baseUrl={baseUrl}
                  favorites={favourites}/>
        </Grid> ) : (
        <Grid key={m.id} item xs={12} sm={6} md={4} lg={3} xl={2}>
          <Show key={m.id} 
                show={m} 
                action={action} 
                baseUrl={baseUrl}
                tvFavourites={favourites} />
        </Grid>
    )}
      
      </>
  ));
  return movieCards;
};

export default MovieList;
