import React from "react";
import {useState, useEffect} from "react";
import PageTemplate from "../components/templateMovieListPage";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import Spinner from "../components/spinner";
import { getMovies } from "../api/tmdb-api";
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
  const [session, setSession] = useState(null);

  const { data, error, isLoading, isError } = useQuery(["discover", id], getMovies);

  async function retrieveSession() {
    const {data: { session },} = await supabase.auth.getSession()   
    if (session){
      setSession(session);
    } else {
      console.log("Home Page no session data");
    }
  }

  useEffect(() => {
    if (session === null) {
      console.log("Home page retrieve session")
      retrieveSession();
    } 
  }, [session]);


  const { filterValues, setFilterValues, filterFunction } = useFiltering(
    [],
    [titleFiltering, genreFiltering]
  );

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

  return (
    <>
      { 
        session === null ? <h2>null</h2> : <h2>{session.user.email}</h2>
      }
      
      <PageTemplate
        title="Discover Movies"
        movies={displayedMovies}
        baseUrl="/movies/"
        isShow={false}
        isMovie={true}
        pageId={id}
        action={(movie) => {
          return <AddToFavouritesIcon movie={movie} />;
        }}
        paginationProps={paginationProps}
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
