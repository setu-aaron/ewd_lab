import React from "react"
import { useParams } from "react-router-dom";
import { useQuery } from "react-query";
import { getPerson } from "../api/tmdb-api";
import PersonCard from "../components/personCard";
import Spinner from "../components/spinner";

const PersonDetailsPage = (props) => {
    const { id } = useParams();
    const { data: person, error, isLoading, isError } = useQuery(["person", { id: id }], getPerson);

    if (isLoading) {
        return <Spinner />;
    }

    if (isError) {
        return <h1>{error.message}</h1>;
    }
    return (
        <PersonCard person={person} />
    );
}

export default PersonDetailsPage;