import React, { useState } from "react";

export const MoviesContext = React.createContext(null);

const MoviesContextProvider = (props) => {
  const [favourites, setFavourites] = useState([]);
  const [myReviews, setMyReviews] = useState({});
  const [playlist, setPlaylist] = useState([]);
  const [session, setSession] = useState({});

  const addToFavourites = (movie) => {
    let updatedFavourites = [...favourites];
    if (!favourites.includes(movie.id)) {
      updatedFavourites.push(movie.id);
    }
    setFavourites(updatedFavourites);
  };

  const retrieveSession = () => {
    console.log("Movie Context retrieve session", session)
    return session;
  };

  const addSession = (_session) => {
    console.log("Movie Context Adding session", _session)
    setSession(_session);
  };

  const removeSession = () => {
    setSession(null);
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
        retrieveSession,
        addSession,
        removeSession,
      }}
    >
      {props.children}
    </MoviesContext.Provider>
  );
};



export default MoviesContextProvider;
