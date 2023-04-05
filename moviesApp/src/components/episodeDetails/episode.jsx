import React from "react";
import img from '../../images/film-poster-placeholder.png'
import { Card, CardMedia, Typography } from "@mui/material";
import MovieCredits  from "../movieCredits";
import Grid from "@mui/material/Grid";
const styles = {
    card: { maxWidth: 345 },
    media: { height: 250 },
}
const Episode = ({ episode }) => {
    console.log(episode)
    return (<>
        <Grid container>
            <Grid item xs={3}>
                <Card sx={styles.card}>
                <CardMedia
                sx={styles.media}
                    image={
                        episode.still_path
                        ? `https://image.tmdb.org/t/p/w500/${episode.still_path}`
                        : img
                    } />
                </Card>
            </Grid>
            <Grid item xs={6}>
                <Card>
                    <Typography variant="h5" component="h3">{episode.name}</Typography>
                    <Typography variant="h6" component="p">Episode Number: {episode.episode_number}</Typography>
                    <Typography variant="h6" component="p">Air Date: {episode.air_date}</Typography>
                    <Typography variant="h6" component="p">Overview: {episode.overview}</Typography>
                </Card>
            </Grid>
        </Grid>
        <MovieCredits credits={episode} />
    </>);
};
export default Episode;