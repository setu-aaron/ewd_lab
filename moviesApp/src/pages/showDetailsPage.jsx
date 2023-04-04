import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import ShowDetails from "../components/showDetails/showDetails";
import ShowCredits from "../components/showCredits/showCredits";
import PageTemplate from "../components/templateShowPage/templateShowPage";
import ShowEpisodes from "../components/showEpisodes/episodes";
import { getShow } from "../api/tmdb-api";
import { getShowCredits } from "../api/tmdb-api";
import { useQuery } from "react-query";
import Spinner from "../components/spinner";
import Grid from "@material-ui/core/Grid";

const ShowDetailsPage = (props) => {
  const { id } = useParams();

  const { data: show, error, isLoading, isError } = useQuery(
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
      {show ? (
        <PageTemplate show={show}>
            <ShowDetails show={show} />
            <Grid container>
              <Grid item xs={12} sm={6} md={4} lg={6} xl={2}>
                <ShowCredits credits={credits} />
              </Grid>
              <Grid item xs={12} sm={6} md={4} lg={6} xl={2}>
                <ShowEpisodes episodes={show} />
              </Grid>
            </Grid>
              
            
          </PageTemplate> 
      ) : (
        <p>Waiting for movie details</p>
      )}
    </>
  );
};

export default ShowDetailsPage;
