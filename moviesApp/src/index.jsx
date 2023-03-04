import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Navigate, Routes, Link } from "react-router-dom";
import SiteHeader from "./components/siteHeader";
import HomePage from "./pages/homePage";
import MoviePage from "./pages/movieDetailsPage";
import FavouriteMoviesPage from "./pages/favouriteMoviesPage"; 
import MovieReviewPage from "./pages/movieReviewPage"; 
const App = () => {
  return (
    <BrowserRouter>
      <SiteHeader />
      <Routes>
        <Route path="/movies/favourites" element={<FavouriteMoviesPage />} />
        <Route path="/movies/:id/:favorite" element={<MoviePage />} />
        <Route path="/" element={<HomePage />} />
        <Route path="*" element={<Navigate to="/" />} />
        <Route path="/reviews/:id" element={<MovieReviewPage />} />
      </Routes>
    </BrowserRouter>
  );
};

const rootElement = createRoot(document.getElementById("root"));
rootElement.render(<App />);
