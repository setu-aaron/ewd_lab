import React from "react";
import {useContext, useState, useEffect} from "react";
import PageTemplate from "../components/templateMovieListPage";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import Spinner from "../components/spinner";
import { getMovies } from "../api/tmdb-api";
import useFiltering from "../hooks/useFiltering";
import AddToFavouritesIcon from "../components/cardIcons/addToFavourites";
import Fab from "@mui/material/Fab";

// import MovieFilterUI, {
//   titleFilter,
//   genreFilter,
// } from "../components/movieFilterUI";

// const titleFiltering = {
//   name: "title",
//   value: "",
//   condition: titleFilter,
// };
// const genreFiltering = {
//   name: "genre",
//   value: "0",
//   condition: genreFilter,
// };

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
  //const { data, error, isLoading, isError } = useQuery(["discover", id], getMovies);

//   const { filterValues, setFilterValues, filterFunction } = useFiltering(
//     [],
//     [titleFiltering, genreFiltering]
//   );

  useEffect(() => {
    console.log("Home Page favoriteChanged: ", favoriteChanged);
    if (favoriteChanged) {
      console.log("Home Page: favoriteChanged is true setting to false");
      setFavoriteChanged(false);
    }
  }, [favoriteChanged]);

  if (isLoading) {
    return <Spinner />;
  }

//   if (isError) {
//     return <h1>{error.message}</h1>;
//   }

//   const changeFilterValues = (type, value) => {
//     const changedFilter = { name: type, value: value };
//     const updatedFilterSet =
//       type === "title"
//         ? [changedFilter, filterValues[1]]
//         : [filterValues[0], changedFilter];
//     setFilterValues(updatedFilterSet);
//   };

  const movies = [];
  //const {total_pages, page, total_results} = data;
  let page = 1;
    let total_pages = 1;
  const displayedMovies = movies;//filterFunction(movies);
  const paginationProps = {
    currentPage: page,
    visiblePages: 5,
    lastPage: total_pages,
  }

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
      <Fab    
        color="secondary"
        variant="extended"
        href="/myMovies/new"
        sx={styles.fab} > New Movie
      </Fab>
      {/* <MovieFilterUI
        onFilterValuesChange={changeFilterValues}
        titleFilter={filterValues[0].value}
        genreFilter={filterValues[1].value}
      /> */}
    </>
  );
};

export default MyMoviesPage;
