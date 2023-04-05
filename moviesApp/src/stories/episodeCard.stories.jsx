import React from "react";
import testEpisode from "./dataEpisode";
import { MemoryRouter } from "react-router";
import { action } from "@storybook/addon-actions";
import MoviesContextProvider from "../contexts/moviesContext";
import Episode             from "../components/episodeDetails/episode";
import AddToFavouritesIcon   from "../components/cardIcons/addToFavourites";

export default {
  title: "Show Details/Episode",
  component: Episode,
  decorators: [
    (Story) => <MemoryRouter initialEntries={["/"]}>{Story()}</MemoryRouter>,
    (Story) => <MoviesContextProvider>{Story()}</MoviesContextProvider>,
  ],
};

export const Basic = () => {
  return (
    <Episode episode={testEpisode}
    />
  );
};
Basic.storyName = "Default";

export const Exceptional = () => {
  const sampleNoPoster = { ...testShow, poster_path: undefined };
  return (
    <ShowCard
      movie={sampleNoPoster}
      action={(movie) => <AddToFavouritesIcon movie={movie} />}
      taging={(movie) => null}
    />
  );
};
Exceptional.storyName = "exception";
