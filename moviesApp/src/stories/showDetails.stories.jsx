import React from "react";
import SampleShow from "./dataShowDetails";
import ShowDetails from "../components/showDetails/showDetails";
import { MemoryRouter } from "react-router";
import MoviesContextProvider from "../contexts/moviesContext";

export default {
  title: "Show Details/ShowDetails",
  component: ShowDetails,
  decorators: [
    (Story) => <MemoryRouter initialEntries={["/"]}>{Story()}</MemoryRouter>,
    (Story) => <MoviesContextProvider>{Story()}</MoviesContextProvider>,
  ],
};
export const Basic = () => <ShowDetails show={SampleShow} />;

Basic.storyName = "Default";
