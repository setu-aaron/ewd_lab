import React, {useEffect, useState} from 'react';
import { useParams } from "react-router-dom";
import { useQuery } from "react-query";
import { getShows } from "../api/tmdb-api";
import Spinner from "../components/spinner";
import PageTemplate from "../components/templateMovieListPage";
import AddToFavouritesTVIcon from "../components/cardIcons/addToTVFavourites";



const ShowPage = (props) => {
    const { id } = useParams();
    const [favoriteChanged, setFavoriteChanged] = useState(false);

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
    
    const paginationProps = {
        currentPage: page,
        visiblePages: 5,
        lastPage: total_pages,
      }
    return (
        <div>
            <PageTemplate
                title="Discover TV Shows"
                shows={shows}
                baseUrl= "/show/"
                isShow={true}
                isMovie={false}
                pageId={id}
                tvActions={(show) => {
                return <AddToFavouritesTVIcon show={show} setFavoriteChanged={setFavoriteChanged}/>;
                }}
                paginationProps={paginationProps}
                favoriteChanged={favoriteChanged}
            />
        </div>
    );
}
export default ShowPage;