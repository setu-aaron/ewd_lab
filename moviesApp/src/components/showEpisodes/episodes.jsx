import React from "react";
import Accordian from "@mui/material/Accordion";
import AccordianDetail from "@mui/material/AccordionDetails";
import AccordianSummary from "@mui/material/AccordionSummary";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Typography } from "@mui/material";
import { Card, Chip, Paper } from "@mui/material";
import { Link } from "react-router-dom";

const styles = {
    chipSet: {
        display: "flex",
        justifyContent: "left",
        alignItems: "center",
        flexWrap: "wrap",
        listStyle: "none",
        padding: 1.5,
        margin: 0,
      },
      chipLabel: {
        margin: 0.5,
      },
      card: {
        maxWidth: 400,
      }
}

const Episdoes = ( {episodes} ) => {
    console.log("Episodes: ", episodes)

    return (<>

        <Typography variant="h6" component="h3">
                {
                episodes.seasons.map((season) => (
                    <>
                    <br/>
                    <Card sx={styles.card}>
                    <Accordian>
                      <AccordianSummary
                          expandIcon={<ExpandMoreIcon/>}
                          aria-controls="panel1a-content"
                          id="{sason.season_number}_panel1a-header"
                          >
                        <Link to={`/show/${episodes.id}/season/${season.season_number}`}><b>{season.name}</b></Link>
                      </AccordianSummary>
                      <AccordianDetail>
                        Air Date: {season.air_date}<br/>
                        Episodes in {season.name}: {season.episode_count}<br/>
                        Overview: {season.overview}
                      </AccordianDetail>
                    </Accordian>
                    </Card>
                    <br/>
                    </>
                ))
                }</Typography>
      </>);
    
};

export default Episdoes;