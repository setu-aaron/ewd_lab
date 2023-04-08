import React from "react";
import testShow from "./dataSampleShow";
import { MemoryRouter } from "react-router";
import { action } from "@storybook/addon-actions";
import MoviesContextProvider from "../contexts/moviesContext";
import ShowCard             from "../components/showCard/showCard";
import AddToTVFavouritesIcon   from "../components/cardIcons/addToTVFavourites";

export default {
  title: "Show Details/ShowCard",
  component: ShowCard,
  decorators: [
    (Story) => <MemoryRouter initialEntries={["/"]}>{Story()}</MemoryRouter>,
    (Story) => <MoviesContextProvider>{Story()}</MoviesContextProvider>,
  ],
};

export const Basic = () => {
  console.log("Show: ", testShow)
  return (
    <ShowCard
      show={testShow}
      action={(movie) => <AddToTVFavouritesIcon movie={movie} />}
      taging={(movie) => null}
      tvFavourites={[18165]}
    />
  );
};
Basic.storyName = "Default";

export const Exceptional = () => {
  const sampleNoPoster = { ...testShow, poster_path: undefined };
  console.log("sampleNoPoster", sampleNoPoster)
  return (
    <ShowCard
      show={sampleNoPoster}
      action={(movie) => <AddToTVFavouritesIcon movie={movie} />}
      taging={(movie) => null}
      tvFavourites={[]}
    />
  );
};
Exceptional.storyName = "exception";
