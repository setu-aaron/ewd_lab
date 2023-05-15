import React from "react";
import {useContext, useState, useEffect} from "react";
import PageTemplate from "../components/templateMovieListPage";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import Spinner from "../components/spinner";
import { getMovies, validateUser } from "../api/tmdb-api";
import useFiltering from "../hooks/useFiltering";
import AddToFavouritesIcon from "../components/cardIcons/addToFavourites";
import { supabase } from "../supabaseClient";
import MovieFilterUI, {
  titleFilter,
  genreFilter,
} from "../components/movieFilterUI";

const titleFiltering = {
  name: "title",
  value: "",
  condition: titleFilter,
};
const genreFiltering = {
  name: "genre",
  value: "0",
  condition: genreFilter,
};

const HomePage = (props) => {
  const { id } = useParams();
  const [favoriteChanged, setFavoriteChanged] = useState(false);
  const { data, error, isLoading, isError } = useQuery(["discover", id], getMovies);
  const {sessionLodaded, setSessionLoaded} = useState(false);

  const { filterValues, setFilterValues, filterFunction } = useFiltering(
    [],
    [titleFiltering, genreFiltering]
  );

  useEffect(() => {
    console.log("Home Page favoriteChanged: ", favoriteChanged);
    if (favoriteChanged) {
      console.log("Home Page: favoriteChanged is true setting to false");
      setFavoriteChanged(false);
    }
  }, [favoriteChanged]);

  useEffect(() => {
      async function retrieveSession() {
        console.log("retrieving session")
        const {data: { session },} = await supabase.auth.getSession()
        console.log("Session retrieved", session)
        console.log("User Id: ", session.user.id)
        console.log("User Email: ", session.user.email)
        validateUser(session.user.email);
        setSessionLoaded(true);

        return session;
    }
  }, [sessionLodaded]);

  if (isLoading) {
    return <Spinner />;
  }
  
  if (isError) {
    return <h1>{error.message}</h1>;
  }

  const changeFilterValues = (type, value) => {
    const changedFilter = { name: type, value: value };
    const updatedFilterSet =
      type === "title"
        ? [changedFilter, filterValues[1]]
        : [filterValues[0], changedFilter];
    setFilterValues(updatedFilterSet);
  };

  const movies = data ? data.results : [];
  const {total_pages, page, total_results} = data;
  const displayedMovies = filterFunction(movies);
  const paginationProps = {
    currentPage: page,
    visiblePages: 5,
    lastPage: total_pages,
  }

  //const { data, error } = await supabase.auth.getSession()
  //const aSession = retrieveSession();
  //console.log("Session: ", aSession);
  // console.log("Props Session: ", props.session);
  // console.log("User ID: ", props.session.user.id);
  // console.log("User Email: ", props.session.user.email);
    
  return (
    <>      
    
      <PageTemplate
        title="Discover Movies"
        movies={displayedMovies}
        baseUrl="/movies/"
        isShow={false}
        isMovie={true}
        pageId={id}
        action={(movie) => {
          return <AddToFavouritesIcon movie={movie} setFavoriteChanged={setFavoriteChanged} />;
        }}
        paginationProps={paginationProps}
        favoriteChanged={favoriteChanged}
      />
      <MovieFilterUI
        onFilterValuesChange={changeFilterValues}
        titleFilter={filterValues[0].value}
        genreFilter={filterValues[1].value}
      />
    </>
  );
};

export default HomePage;
