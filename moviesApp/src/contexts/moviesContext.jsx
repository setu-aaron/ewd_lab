import React, { useState} from "react";

export const MoviesContext = React.createContext(null);

const MoviesContextProvider = (props) => {
    const [favorites, setFavorites] = useState([]);

    const addToFavourites = (movie) => {
        let updatedFavorites = [...favorites, movie];
        if (!favorites.includes(movie)) {
            updatedFavorites.push(movie.id);
        }
        setFavorites(updatedFavorites);
    }   

    const removeFromFavorites = (movie) => {
        setFavorites(favorites.filter((mId) => mId !== movie.id));
    };

    return (
        <MoviesContext.Provider value={{ favorites, addToFavourites, removeFromFavorites }}>
            {props.children}
        </MoviesContext.Provider>
    )
};
export default MoviesContextProvider;