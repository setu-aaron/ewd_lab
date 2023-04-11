import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import MovieDetails from "../components/movieDetails";
import MovieCredits from "../components/movieCredits";
import PageTemplate from "../components/templateMoviePage";
import { supabase } from "../supabaseClient";

const MyMovieDetailsPage = (props) => {
  const { id } = useParams();
  console.log("ID: ", id)
  const [needsToRefresh, setNeedsToRefresh] = useState(true);
  const [movie, setMovie] = useState(null);
  
  useEffect(() => {
    async function retrieveCustomMovies(){
      const {data: { session },} = await supabase.auth.getSession()   
      if (session){
        console.log("AP: session: ", session)
        let { data: createdMovies, error } = await supabase
        .from('createdMovies')
        .select('*')
        .eq('userId', session.user.id)
        console.log("AP: createdMovies: ", createdMovies)

        let theMovie = {};
        for (let i = 0; i < createdMovies.length; i++){
          if (createdMovies[i].id == id){
            let movie = createdMovies[i];
            let movieDetails = movie.movieDetails
            movieDetails.id=movie.id
            theMovie=movieDetails
            setMovie(theMovie)
            break;
          }
        }

      } else {
        console.log("AP: session is null");
      }
    }
    if (needsToRefresh){
      retrieveCustomMovies();
      setNeedsToRefresh(false);
    }
  }, [needsToRefresh]);
  console.log("movie: ", movie)
  return (
    <> 
      {movie ? (
          <PageTemplate movie={movie} 
                        showImages={false}>
            <MovieDetails movie={movie} />
            <MovieCredits credits={movie.cast} />
          </PageTemplate>
      ) : (
        <p>Waiting for movie details</p>
      )}
    </>
  );
};

export default MyMovieDetailsPage;
