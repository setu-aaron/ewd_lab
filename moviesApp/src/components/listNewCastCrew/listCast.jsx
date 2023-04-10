import React, {useState} from "react";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import ImageListItemBar from "@mui/material/ImageListItemBar";
import { Link } from "react-router-dom";


const styles = {
    paper: {
    listStyle: "none",
    },
    gridListRoot: {
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "space-around",
      },
    gridList: {
      width: 450,
      height: '100vh',
    },

}



const ListCast = ( {credits, setPerson}) => {   
    function selectPerson(person) {
        console.log("Button clicked")
        console.log(person)
        setPerson(person)
    }

    console.log("List Cast Component loading:", credits)
    return (<>
     {credits ? (
        <Grid container spacing={5} style={{ padding: "15px" }}>
            {credits.cast !== undefined ? (
            <Grid item xs={12} sm={6} md={4} lg={6} xl={11}>
                <Paper sx={styles.gridListRoot}>
                    <h2>Search Results</h2>
                        <ImageList cols={1}>
                            {credits.cast.map((c) => ( 
                                <Grid container>
                                    <Grid item xs={6} sm={3} md={2} lg={3} xl={9}>
                                        <Link to={`/person/${c.id}`}>
                                            <ImageListItem
                                                key={c.profile_path}
                                                cols={1}>
                                                    {c.profile_path ?(
                                                <img src={`https://image.tmdb.org/t/p/w500/${c.profile_path}`} />
                                                    ) : (
                                                <img src="/missingImage3.png" />
                                                )}
                                                <ImageListItemBar 
                                                    title={c.name}
                                                    subtitle={c.character}/>
                                            </ImageListItem>
                                        </Link>
                                    </Grid>
                                    { setPerson ?(
                                        <Grid item xs={6} sm={3} md={2} lg={3} xl={1} sx={styles.gridListRoot}>
                                    
                                        <Button variant="contained" onClick={() =>selectPerson(c)}>
                                            Add
                                        </Button>
                                    </Grid>
                                    ):(<></>)
                                    }
                                    
                                </Grid>
                            ))}
                        </ImageList>
                </Paper>
            </Grid>
            ):(<></>)}
        </Grid>
     ) : (
            <p>Search to add Actors to your movie</p>
     )}
    </>);
}

export default ListCast;