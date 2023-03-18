import React from "react";
import Credits from "./castData";
import MovieCredits from "../components/movieCredits";
import { MemoryRouter } from "react-router";
import MoviesContextProvider from "../contexts/moviesContext";


export default {    
    title: "Movie Details Page/MovieCredits",
    component: MovieCredits,
    decorators: [
        (Creds) => <MemoryRouter initialEntries={["/"]}>{Creds()}</MemoryRouter>,
        (Creds) => <MoviesContextProvider>{Creds()}</MoviesContextProvider>,
    ],  
};
console.log("Story Credits: ", Credits)
export const Basic = () => <MovieCredits credits={Credits} />;

Basic.storyName = "Default";
