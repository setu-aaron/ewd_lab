import React, { useContext, useEffect, useState } from "react";
import PageTemplate from "../components/templateMovieListPage";
import { useQueries } from "react-query";
import { getMovie, getShow } from "../api/tmdb-api";
import Spinner from "../components/spinner";
import useFiltering from "../hooks/useFiltering";
import MovieFilterUI, { titleFilter } from "../components/movieFilterUI";
import RemoveFromFavourites from "../components/cardIcons/removeFromFavourites";
import RemoveFromTVFavourites from "../components/cardIcons/removeFromTVFavourites";
import WriteReview from "../components/cardIcons/writeReview";
import { supabase } from "../supabaseClient";

const titleFiltering = {
  name: "title",
  value: "",
  condition: titleFilter,
};

export const genreFiltering = {
  name: "genre",
  value: "0",
  condition: function (movie, value) {
    // Is user selected genre in this movies's genre list? 
    // Always true if selected genre ia All (0).
    const genreId = Number(value);
    const genre_ids = movie.genres.map((g) => g.id);
    return genreId > 0 ? genre_ids.includes(genreId) : true;
  },
};

const FavouriteMoviesPage = () => {
  const [ needsQuery, setNeedsQuery ] = useState(true);
  const [isQuerying, setIsQuerying] = useState(true);
  const [movieIds, setMovieIds] = useState([]);
  const [showIds, setShowIds] = useState([]);
  useEffect(() => {
    console.log("FavPage useEffect")
    async function queryTable() {
      console.log("FavPage: Loading is true");
      const {data: { session },} = await supabase.auth.getSession()   
      if (session){
        console.log("FavPage: session: ", session)
      } else {
        console.log("FavPage: session is null");
      }
      console.log("FavPage: User ID is: ", session.user.id)

      let { data: favoriteMovies, error } = await supabase
      .from('favoriteMovies')
      .select('movieId')
      .eq('userId', session.user.id)

      setMovieIds(favoriteMovies.map((m) => m.movieId));

      let { data: favoriteShows, showError } = await supabase
      .from('favoriteShows')
      .select('showId')
      .eq('userId', session.user.id)

      setShowIds(favoriteShows.map((m) => m.showId));

      setIsQuerying(false);
    }

    if (needsQuery){
      console.log("FavPage: needs query ");
      queryTable();
      setNeedsQuery(false);
      setIsQuerying(true);
    }
  }, [needsQuery])

    const { filterValues, setFilterValues, filterFunction } = useFiltering(
      [],
      [titleFiltering, genreFiltering]
    );


  // Create an array of queries and run them in parallel.
  const favouriteMovieQueries = useQueries(
    movieIds.map((movieId) => {
    console.log("getting details on favorites", movieId)
      return {
        queryKey: ["movie", { id: movieId }],
        queryFn: getMovie,
      };
    })
  );


  // Check if any of the parallel queries are still loading.
   const isLoading = favouriteMovieQueries.find((m) => m.isLoading === true);

  const favouriteTVShowQueries = useQueries(
    showIds.map((showId) => {
      return {
        queryKey: ["tv", { id: showId }],
        queryFn: getShow,
      };  
    })  
  );

  const isFavouritesLoading = favouriteTVShowQueries.find((m) => m.isLoading === true);

  if (isLoading || isFavouritesLoading) {
    
    return <Spinner />;
    
  } else {
    console.log("Favourite Movies Page")
  }

  const allFavourites = favouriteMovieQueries.map((q) => q.data);
  const displayMovies = allFavourites
    ? filterFunction(allFavourites)
    : [];

  const allShowFavourites = favouriteTVShowQueries.map((q) => q.data);
  const displayShows = allShowFavourites
    // ? filterFunction(allShowFavourites)
    // : [];

  // const toDo = () => true;
  // const changeFilterValues = (type, value) => {
  //   console.log("changing values", type, value)
  //   const changedFilter = { name: type, value: value };
  //   const updatedFilterSet =
  //     type === "title"
  //       ? [changedFilter, filterValues[1]]
  //       : [filterValues[0], changedFilter];
  //   setFilterValues(updatedFilterSet);
  // };

  const paginationProps = {
    currentPage: 0,
    visiblePages: 0,
    lastPage: 0,
  }

  return (
      <PageTemplate
        title="Favourite Movies"
        movies={displayMovies}
        shows={displayShows}
        baseUrl="/movies/" 
        isMovie={true}
        isShow={true}
        action={(movie) => {
          return (
            <>
              <RemoveFromFavourites movie={movie} setNeedsQuery={setNeedsQuery} />
              <WriteReview movie={movie} />
            </>
          );
        }}
        tvActions={(show) => {
          return (
            <>
              <RemoveFromTVFavourites show={show} setNeedsQuery={setNeedsQuery} />
            </>
          );
        }}
        paginationProps={paginationProps}
      />
  );
};

export default FavouriteMoviesPage;
