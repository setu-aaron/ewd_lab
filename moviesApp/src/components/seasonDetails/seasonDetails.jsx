import React from "react";
import Accordian from "@mui/material/Accordion";
import AccordianDetail from "@mui/material/AccordionDetails";
import AccordianSummary from "@mui/material/AccordionSummary";
import {Card, CardMedia, Grid, Typography } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
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
    <Grid container>
        <Grid item xs={3}>
        <Card sx={styles.card}>
            <CardMedia
            sx={styles.media}
            image={
            season.poster_path
                ? `https://image.tmdb.org/t/p/w500/${season.poster_path}`
                : img
            }
            />
        </Card>
        </Grid>
        <Grid item xs={9}>
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
                            <Accordian>
                                <AccordianSummary
                                    expandIcon={<ExpandMoreIcon/>}
                                    aria-controls="panel1a-content"
                                    id="{sason.season_number}_panel1a-header"
                                    >
                                    <Typography variant="h6" component="p">
                                        Title: <Link to={`/show/${showId}/season/${season.season_number}/episode/${episode.episode_number}`}>{episode.name}</Link>
                                    </Typography>                               
                                </AccordianSummary>
                                <AccordianDetail>
                                    <Typography variant="h6" component="p">
                                        Overview: {episode.overview}
                                    </Typography>
                                </AccordianDetail>
                            </Accordian>
                            
                        </Card>
                        
                    </>
                ))}
            </>

        ) : (
        <p>Waiting for movie details</p>
        )}
        </Grid>
        </Grid>
    </>
);
};
export default SeasonDetails;