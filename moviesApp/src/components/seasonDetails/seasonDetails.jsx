import React from "react";
import { Card, CardMedia, Typography } from "@mui/material";
import img from '../../images/film-poster-placeholder.png';
import { Link } from "react-router-dom";
const styles = {
    card: { maxWidth: 345 },
    media: { height: 500 },
    avatar: {
      backgroundColor: "rgb(255, 0, 0)",
    },
  };
const SeasonDetails = ({season, showId}) => {
    return    (
    <>
        <CardMedia
        sx={styles.media}
        image={
          season.poster_path
            ? `https://image.tmdb.org/t/p/w500/${season.poster_path}`
            : img
        }
      />
        {season ? (
            <>
                <Card>
                    <Typography variant="h5" component="h3">
                        {season.name}
                    </Typography>
                    <Typography variant="h6" component="p">
                        {season.overview}
                    </Typography>   
                    <Typography variant="h6" component="p">
                        Air Date: {season.air_date}
                    </Typography>    
                    <Typography variant="h6" component="p">
                        Season Number: {season.season_number}
                    </Typography>   
                    <Typography variant="h6" component="p">
                        Season Number: { season.episodes.length}
                    </Typography>
                </Card>
                {season.episodes.map((episode) => (
                    <><br/>
                        <Card>
                            <Typography variant="h6" component="p">
                                    Title: <Link to={`/show/${showId}/season/${season.season_number}/episode/${episode.episode_number}`}>{episode.name}</Link>
                            </Typography>
                            <Typography variant="h6" component="p">
                                    Overview: {episode.overview}
                            </Typography>
                        </Card>
                        
                    </>
                ))}
            </>

        ) : (
        <p>Waiting for movie details</p>
        )}
    </>
);
};
export default SeasonDetails;