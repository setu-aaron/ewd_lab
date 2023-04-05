import React, { useState } from "react";
import Chip from "@mui/material/Chip";
import Paper from "@mui/material/Paper";
import Card from "@mui/material/Card";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import MonetizationIcon from "@mui/icons-material/MonetizationOn";
import StarRate from "@mui/icons-material/StarRate";
import Typography from "@mui/material/Typography";

import NavigationIcon from "@mui/icons-material/Navigation";
import Fab from "@mui/material/Fab";
import Drawer from "@mui/material/Drawer";
import MovieReviews from '../movieReviews'

const styles = {
  chipSet: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexWrap: "wrap",
    listStyle: "none",
    padding: 1.5,
    margin: 0,
  },
  chipLabel: {
    margin: 0.5,
  },
  fab: { 
    position: "fixed",
    top: 50,
    right: 2,
  },
};

const ShowDetails = ( {show}) => {
  const [drawerOpen, setDrawerOpen] = useState(false); // New
  
  return (
    <>
      <Typography variant="h5" component="h3">
        Overview
      </Typography>

      <Typography variant="h6" component="p">
        {show.overview}
      </Typography>

      <Card sx={styles.card}>
        <Typography variant="h6" component="h3">
            First Air Date: {show.first_air_date} <br/>
            Last Air Date: {show.last_air_date}
        </Typography>
        {/* <Typography variant="h6" component="h3">
            Last Episode: {show.last_episode_to_air.name}
        </Typography>
        <Typography variant="h6" component="h3">
            Last Episode Overview: {show.last_episode_to_air.overview}</Typography> */}
        <Typography variant="h6" component="h3">
            Number of Seasons: {show.last_episode_to_air.season_number}</Typography>
        {/* <Typography variant="h6" component="h3">
            Episode: {show.last_episode_to_air.episode_number}</Typography>
         */}
        <Typography variant="h6" component="h3">
            Number of Episodes: {show.number_of_episodes}</Typography>

        <Typography variant="h6" component="h3">
            Country of Origin: {show.origin_country[0]}</Typography>
            
            <Paper component="ul" sx={styles.chipSet}>
            <Chip label="Networks" sx={styles.chipLabel} color="primary" />
            {
                show.networks.map((network) => (
                        <Chip sx={styles.chipLabel} label={network.name}  />))
            }
            </Paper>
        
            <Paper component="ul" sx={styles.chipSet}>
            <Chip label="Production Companies" sx={styles.chipLabel} color="primary" />
            {show.production_companies.map((company) => (
              
                    <Chip sx={styles.chipLabel}label={company.name}  />
           
                ))
                
            }</Paper>
            </Card>

      <Paper component="ul" sx={styles.chipSet}>
        <li>
          <Chip label="Genres" sx={styles.chipLabel} color="primary" />
        </li>
        {show.genres.map((g) => (
          <li key={g.name}>
            <Chip label={g.name}  />
          </li>
        ))}
      </Paper>
      <Paper component="ul" sx={styles.chipSet}>
        {/* <Chip icon={<AccessTimeIcon />} label={`${show.runtime} min.`} />
        <Chip
          icon={<MonetizationIcon />}
          label={`${show.revenue.toLocaleString()}`}
        /> */}
        <Chip
          icon={<StarRate />}
          label={`${show.vote_average} (${show.vote_count})`}
        />
        <Chip label={`Released: ${show.first_air_date}`} />
      </Paper>
      <Fab    
        color="secondary"
        variant="extended"
        onClick={() =>setDrawerOpen(true)}
        sx={styles.fab}
      >
        <NavigationIcon />
        Reviews
      </Fab>
      <Drawer anchor="top" open={drawerOpen} onClose={() => setDrawerOpen(false)}>
        <MovieReviews movie={show} />
      </Drawer>
    </>
  );
};
export default  ShowDetails ;
