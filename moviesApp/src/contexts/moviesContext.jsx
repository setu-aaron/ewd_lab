import React, { useState } from "react";

export const MoviesContext = React.createContext(null);

const MoviesContextProvider = (props) => {
  const [favourites, setFavourites] = useState([]);
  const [tvFavourites, setTvFavourites] = useState([]);
  const [myReviews, setMyReviews] = useState({});
  const [playlist, setPlaylist] = useState([]);
  const [session, setSession] = useState({});

  const addToTVFavourites = (show) => {
    let updatedFavourites = [...tvFavourites];
    if (!tvFavourites.includes(show.id)) {
      updatedFavourites.push(show.id);
    }
    console.log("addToTVFavourites", updatedFavourites)
    setTvFavourites(updatedFavourites);
  };
  const addToFavourites = (movie) => {
    let updatedFavourites = [...favourites];
    if (!favourites.includes(movie.id)) {
      updatedFavourites.push(movie.id);
    }
    setFavourites(updatedFavourites);
  };


  // We will use this function in a later section
  const removeFromFavourites = (movie) => {
    setFavourites(favourites.filter((mId) => mId !== movie.id));
  };

  const removeFromTVFavourites = (show) => {
    console.log("context removeFromTVFavourites", show)
    setTvFavourites(tvFavourites.filter((mId) => mId !== show.id));
  };

  const addReview = (movie, review) => {   
    setMyReviews( {...myReviews, [movie.id]: review } )
  };

  const addToPlayList = (movie) => {   
    let updatedPlayList = [...playlist];
    if (!playlist.includes(movie.id)) {
      updatedPlayList.push(movie.id);
    }
    setPlaylist(updatedPlayList);
  };

  const logPlaylist = () =>{
    console.log(playlist)
  }

  return (
    <MoviesContext.Provider
      value={{
        favourites,
        tvFavourites,
        addToFavourites,
        addToTVFavourites,
        removeFromFavourites,
        removeFromTVFavourites,
        addReview,
        addToPlayList,
        logPlaylist,
      }}
    >
      {props.children}
    </MoviesContext.Provider>
  );
};



export default MoviesContextProvider;
