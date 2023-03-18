import React from "react";
import SampleMovie from "./sampleData";
import MovieDetails from "../components/movieDetails";
import { MemoryRouter } from "react-router";
import MoviesContextProvider from "../contexts/moviesContext";

export default {
  title: "Movie Details Page/MovieDetails",
  component: MovieDetails,
  decorators: [
    (Story) => <MemoryRouter initialEntries={["/"]}>{Story()}</MemoryRouter>,
    (Story) => <MoviesContextProvider>{Story()}</MoviesContextProvider>,
  ],
};
export const Basic = () => <MovieDetails movie={SampleMovie} />;

Basic.storyName = "Default";
