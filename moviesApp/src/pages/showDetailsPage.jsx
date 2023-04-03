import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import MovieDetails from "../components/movieDetails";
import MovieCredits from "../components/movieCredits";
import PageTemplate from "../components/templateMoviePage";
//import useMovie from "../hooks/useMovie";
import { getShow } from "../api/tmdb-api";
import { getShowCredits } from "../api/tmdb-api";
import { useQuery } from "react-query";
import Spinner from "../components/spinner";

const ShowDetailsPage = (props) => {
  const { id } = useParams();

  const { data: movie, error, isLoading, isError } = useQuery(
    ["show", { id: id }],
    getShow
  );

  const { data: credits, creditsError, creditsLoading, isCreditsError } = useQuery(
    ["showCredits", { id: id }],
    getShowCredits
  );

  if (isLoading || creditsLoading) {
    return <Spinner />;
  }

  if (isError) {
    return <h1>{error.message}</h1>;
  }
  if (isCreditsError) {
    console.log("ShowDetailspage: credits error: ", creditsError.message)
    return <h1>{creditsError.message}</h1>;
  }


  return (
    <>
      {movie ? (
        <>
          {/* <PageTemplate movie={movie}>
            <MovieDetails movie={movie} />
            <MovieCredits credits={credits} />
          </PageTemplate> */}
        </>
      ) : (
        <p>Waiting for movie details</p>
      )}
    </>
  );
};

export default ShowDetailsPage;
