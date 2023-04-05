import React from "react";
import testSeason from "./dataShowSeason";
import { MemoryRouter } from "react-router";
import { action } from "@storybook/addon-actions";
import MoviesContextProvider from "../contexts/moviesContext";
import SeasonDetails            from "../components/seasonDetails/seasonDetails";

export default {
  title: "Show Details/SeasonDetails",
  component: SeasonDetails,
  decorators: [
    (Story) => <MemoryRouter initialEntries={["/"]}>{Story()}</MemoryRouter>,
    (Story) => <MoviesContextProvider>{Story()}</MoviesContextProvider>,
  ],
};

export const Basic = () => {
  return (
    <SeasonDetails season={testSeason}/>
  );
};
Basic.storyName = "Default";
