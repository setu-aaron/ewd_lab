import React from "react";
import { useEffect, useState, useContext } from "react";
import { supabase } from './supabaseClient';
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Navigate, Routes, Link } from "react-router-dom";
import SiteHeader from "./components/siteHeader";
import LoginPage from "./pages/loginPage"
import AccountPage from "./pages/accountPage"
import HomePage from "./pages/homePage";
import UpcomingMoviePage from "./pages/upcomingMoviesPage";
import MoviePage from "./pages/movieDetailsPage";
import ShowDetailsPage from "./pages/showDetailsPage";
import FavouriteMoviesPage from "./pages/favouriteMoviesPage"; 
import MovieReviewPage from "./pages/movieReviewPage";
import AddMovieReviewPage from "./pages/addMovieReviewPage";
import PersonDetailsPage from "./pages/personDetailsPage";
import ShowsHomePage from "./pages/showPage";
import ShowSeasonPage from "./pages/showSeasonPage";
import ShowEpisodePage from "./pages/showEpisodePage";
import MyMoviePage from "./pages/myMoviesPage";
import NewMoviePage from "./pages/newMoviePage";
import MyMovieDetailsPage from "./pages/myMovieDetailsPage";
import { QueryClientProvider, QueryClient } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import MoviesContextProvider from "./contexts/moviesContext";
import ProtectedRoute from "./components/protectedRoute/protectedRoute";


const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 60, // 1 hour
      refetchInterval: 1000 * 60 * 60, // 1 hour
      refetchOnWindowFocus: false
    },
  },
});

const App = () => {
  const [session, setSession] = useState(null)
  
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { _session } }) => {
      if (_session === undefined){
      } else {
        setSession(_session)
      }
      
    })
  
    supabase.auth.onAuthStateChange((_event, _session) => {
      if (_session === undefined){
        console.log("index session null")
      } else {
        console.log("auth state changed index session authStateChanged", _session)
        setSession(_session)
      }
    })
  }, [])



  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <SiteHeader />
        <MoviesContextProvider>
          <Routes>
            <Route path="/" element={
              <ProtectedRoute>
                <HomePage session={session}/>
              </ProtectedRoute>
              } />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/account" element={
              <ProtectedRoute>
                <AccountPage />
              </ProtectedRoute>
            } />
            <Route path="/movies/page/:id" element={<HomePage />} />
            <Route path="/movies/:id/:favorite" element={<MoviePage />} />
            <Route path="/movies/favourites" element={<FavouriteMoviesPage />} />
            <Route path="/movies/upcoming" element={<UpcomingMoviePage />} />
            <Route path="/movies/upcoming/page/:id" element={<UpcomingMoviePage />} />
            <Route path="/reviews/:id" element={<MovieReviewPage />} />
            <Route path="/reviews/form" element={<AddMovieReviewPage/>} />
            <Route path="/person/:id" element={<PersonDetailsPage/>} />
            <Route path="/show/page/:id" element={<ShowsHomePage/>} />
            <Route path="/show/:id/:favorite" element={<ShowDetailsPage />} />
            <Route path="/show/:showId/season/:seasonId" element={<ShowSeasonPage />} />
            <Route path="/show/:showId/season/:seasonId/episode/:episodeId" element={<ShowEpisodePage />} />
            <Route path="/myMovies" element={
              <ProtectedRoute>
                <MyMoviePage />
              </ProtectedRoute>
            } />
            <Route path="/myMovie/:id/:favorite" element={
              <ProtectedRoute>
                <MyMovieDetailsPage />
              </ProtectedRoute>
            } />
            <Route path="/myMovies/new" element={
              <ProtectedRoute>
                <NewMoviePage />
              </ProtectedRoute>
            } />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </MoviesContextProvider>
      </BrowserRouter>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};

const rootElement = createRoot(document.getElementById("root"));
rootElement.render(<App />);
