import React from "react";
import testShow from "./dataSampleShow";
import { MemoryRouter } from "react-router";
import { action } from "@storybook/addon-actions";
import MoviesContextProvider from "../contexts/moviesContext";
import ShowCard             from "../components/showCard/showCard";
import AddToFavouritesIcon   from "../components/cardIcons/addToFavourites";

export default {
  title: "Show Details/ShowCard",
  component: ShowCard,
  decorators: [
    (Story) => <MemoryRouter initialEntries={["/"]}>{Story()}</MemoryRouter>,
    (Story) => <MoviesContextProvider>{Story()}</MoviesContextProvider>,
  ],
};

export const Basic = () => {
  return (
    <ShowCard
      show={testShow}
      action={(movie) => <AddToFavouritesIcon movie={movie} />}
      taging={(movie) => null}
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
