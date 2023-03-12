import React, { useState } from "react";

export const MoviesContext = React.createContext(null);

const MoviesContextProvider = (props) => {
  const [favourites, setFavourites] = useState([]);
  const [myReviews, setMyReviews] = useState({});
  const [playlist, setPlaylist] = useState([]);

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
        addToFavourites,
        removeFromFavourites,
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
