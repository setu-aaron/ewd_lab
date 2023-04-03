import React from 'react';
import { useParams } from "react-router-dom";
import { useQuery } from "react-query";
import { getShows } from "../api/tmdb-api";
import Spinner from "../components/spinner";
import PageTemplate from "../components/templateMovieListPage";



const ShowPage = (props) => {
    const { id } = useParams();
    const { data, error, isLoading, isError } = useQuery(["discoverShows", id], getShows);
    if (isLoading) {
        return <Spinner />;
    }

    if (isError) {
        return <h1>{error.message}</h1>;
    }

    const shows = data ? data.results : [];
    console.log(shows)
    const {total_pages, page, total_results} = data;
    //const displayedShows = filterFunction(shows);
    const paginationProps = {
        currentPage: page,
        visiblePages: 5,
        lastPage: total_pages,
      }
    return (
        <div>
            <PageTemplate
                title="Discover TV Shows"
                movies={shows}
                baseUrl= "/show/"
                isShow={true}
                isMovie={false}
                pageId={id}
                action={(show) => {
                //return <AddToFavouritesIcon movie={show} />;
                return <></>;
                }}
                paginationProps={paginationProps}
            />
        </div>
    );
}
export default ShowPage;