import React from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "react-query";
import Episode from "../components/episodeDetails/episode";
import Spinner from "../components/spinner";
import { getSeasonDetails } from "../api/tmdb-api";


const ShowEpisodePage = (props) => {
    const { showId, seasonId, episodeId } = useParams();

    console.log("ShowSeasonPage: showId: ", showId);
    console.log("ShowSeasonPage: seasonId: ", seasonId);
    //this should almost always come from the cache 
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
            <Episode episode={season.episodes[Number(episodeId) - 1]}
            showId={showId} />
        ) : (
        <p>Waiting for episode details</p>
        )}
    </>
);
};
export default ShowEpisodePage;