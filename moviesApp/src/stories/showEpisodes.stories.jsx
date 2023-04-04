import React from "react";
import testShow from "./dataShowDetails";
import { MemoryRouter } from "react-router";
import { action } from "@storybook/addon-actions";
import MoviesContextProvider from "../contexts/moviesContext";
import ShowEpisodes            from "../components/showEpisodes/episodes";

export default {
  title: "Show Details/ShowEpisodes",
  component: ShowEpisodes,
  decorators: [
    (Story) => <MemoryRouter initialEntries={["/"]}>{Story()}</MemoryRouter>,
    (Story) => <MoviesContextProvider>{Story()}</MoviesContextProvider>,
  ],
};

export const Basic = () => {
  return (
    <ShowEpisodes episodes={testShow}/>
  );
};
Basic.storyName = "Default";

// export const Exceptional = () => {
//   const sampleNoPoster = { ...testShow, poster_path: undefined };
//   return (
//     <ShowCard
//       movie={sampleNoPoster}
//       action={(movie) => <AddToFavouritesIcon movie={movie} />}
//       taging={(movie) => null}
//     />
//   );
// };
//Exceptional.storyName = "exception";
