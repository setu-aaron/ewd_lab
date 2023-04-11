import React from "react";
import {useContext, useState, useEffect} from "react";
import PageTemplate from "../components/templateMovieListPage";
import { useParams } from "react-router-dom";
import Spinner from "../components/spinner";
import DeleteCustomMovie from "../components/cardIcons/deleteCustomMovie";
import Fab from "@mui/material/Fab";
import { supabase } from '../supabaseClient'


const styles = {
    fab: { 
      position: "fixed",
      top: 100,
      right: 20,
    },
  };
const MyMoviesPage = (props) => {
  const { id } = useParams();
  const [favoriteChanged, setFavoriteChanged] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [needsToRefresh, setNeedsToRefresh] = useState(true);
  const [myMovies, setMyMovies] = useState([]);

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

        let movieArray = []
        for (let i = 0; i < createdMovies.length; i++){
          let movie = createdMovies[i];
          let movieDetails = movie.movieDetails
          movieDetails.id=movie.id
          console.log("myMoviesPage: movieDetails: ", movieDetails.tagLine)
          movieArray.push(movieDetails)
        }

        setMyMovies(movieArray)
      } else {
        console.log("AP: session is null");
      }
    }
    

    if (needsToRefresh){
      retrieveCustomMovies();
      setNeedsToRefresh(false);
    }
  }, [needsToRefresh]);
  
  useEffect(() => {
    console.log("Home Page favoriteChanged: ", favoriteChanged);
    if (needsToRefresh) {
      console.log("Home Page: favoriteChanged is true setting to false");
      setNeedsToRefresh(false);
    }
  }, [needsToRefresh]);

  if (isLoading) {
    return <Spinner />;
  }

  const movies = [];
  //const {total_pages, page, total_results} = data;
  let page = 1;
    let total_pages = 1;
  const displayedMovies = myMovies;//filterFunction(movies);
  const paginationProps = {
    currentPage: page,
    visiblePages: 5,
    lastPage: total_pages,
  }

  return (
    <>      
      <PageTemplate
        title="My Custom Movies"
        movies={displayedMovies}
        baseUrl="/myMovie/"
        isShow={false}
        isMovie={true}
        pageId={id}
        action={(movie) => {
          return <DeleteCustomMovie movie={movie} setFavoriteChanged={setNeedsToRefresh} />;
        }}
        paginationProps={paginationProps}
        favoriteChanged={favoriteChanged}
      />
      <Fab    
        color="secondary"
        variant="extended"
        href="/myMovies/new"
        sx={styles.fab} > New Movie
      </Fab>
    </>
  );
};

export default MyMoviesPage;
