import React, { useState, useEffect } from "react";
import PageTemplate from '../components/templateMovieListPage'
import { useQuery } from "react-query";
import Spinner from "../components/spinner";
import { getUpcomingMovies } from "../api/tmdb-api";
import useFiltering from "../hooks/useFiltering";
import MovieFilterUI, {
  titleFilter,
  genreFilter,
} from "../components/movieFilterUI";
import AddToFavouritesIcon from "../components/cardIcons/adddToFavourites";
import AddToPlaylistIcon from "../components/cardIcons/addToPlaylist";


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



const UpcomingMoviesPage = (props) => {
  const { data, error, isLoading, isError } = useQuery("upcoming", getUpcomingMovies);
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
  const displayedMovies = filterFunction(movies);

  return (
    <>
    <PageTemplate
      title='Discover Movies'
      movies={displayedMovies}
      action={(movie)=>{
        return <AddToPlaylistIcon movie={movie}/>
      }}
    />
      <MovieFilterUI
        onFilterValuesChange={changeFilterValues}
        titleFilter={filterValues[0].value}
        genreFilter={filterValues[1].value}
      />
      </>
  );
};
export default UpcomingMoviesPage;
