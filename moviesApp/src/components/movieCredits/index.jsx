import React from "react";
import Grid from "@mui/material/Grid";
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
const MovieCredits = ( {credits}) => {  
    console.log("Move Credits Component loading:", credits)
    return (<>
     {credits ? (
        <Grid container spacing={5} style={{ padding: "15px" }}>
            {credits.cast !== undefined ? (
            <Grid item xs={3} id="castId">
                <div sx={styles.gridListRoot}>
                    <h2>Cast</h2>
                        <ImageList cols={1}>
                            {credits.cast.map((c) => ( 
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
                            ))}
                        </ImageList>
                </div>
            </Grid>
            ):(<></>)}
        {credits.guest_stars !== undefined ? (
            <Grid item xs={3} id="castId">
                <div sx={styles.gridListRoot}>
                    <h2>Guest Stars</h2>
                        <ImageList cols={1}>
                            {credits.guest_stars.map((c) => ( 
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
                            ))}
                        </ImageList>
                </div>
            </Grid>
            ):(<></>)}
        {credits.crew !== undefined ? (
            <Grid item xs={3}
                id="crewId">
                <h2>Crew</h2>
                <div sx={styles.gridListRoot}>
                <ImageList cols={1}>
                    {credits.crew.map((c) => ( 

                        <Link to={`/person/${c.id}`}>
                        <ImageListItem
                            key={c.profile_path}
                            cols={1}>
                                {c.profile_path ?(
                            <img
                                src={`https://image.tmdb.org/t/p/w500/${c.profile_path}`} />
                                ) : (
                                    <img src="/missingImage3.png" />
                                    )}
                             <ImageListItemBar
                                title={c.name}
                                subtitle={c.job}/>
                        </ImageListItem>
                        </Link>
                    ))}
                </ImageList>
            </div>
            </Grid>
            ):(<></>)}
        </Grid>
     ) : (
            <p>Waiting for movie credits</p>
     )}
    </>);
}

export default MovieCredits;