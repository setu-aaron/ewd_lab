import React from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "react-query";
import SeasonDetails from "../components/seasonDetails/seasonDetails";
import Spinner from "../components/spinner";
import { getSeasonDetails } from "../api/tmdb-api";


const ShowSeasonPage = (props) => {
    const { showId, seasonId } = useParams();
    console.log("ShowSeasonPage: showId: ", showId);
    console.log("ShowSeasonPage: seasonId: ", seasonId);

    const { data: season, error, isLoading, isError } = useQuery(
        ["season", showId, seasonId],
        getSeasonDetails
      );
      if (isLoading) {
        return <Spinner />;
      }
    
      if (isError) {
        return <h1>{error.message}</h1>;
      }
    return    (
    <>
        {season ? (
            <SeasonDetails season={season} showId={showId} />
        ) : (
        <p>Waiting for movie details</p>
        )}
    </>
);
};
export default ShowSeasonPage;