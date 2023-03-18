import React from "react";
import Paper from "@mui/material/Paper";
const styles = {
    paper: {
    listStyle: "none",
    }

}
const MovieCredits = ( {credits}) => {  
    console.log("Credits:", credits)
    return (<>
    <Paper component="ul" sx={styles.paper}>
        <li>Actor : Character</li>
        {credits.cast.map((c) => (
            <>
            <li key={c.id}>{c.name} : {c.character} 
            </li>
            <img
            src={`https://image.tmdb.org/t/p/w500/${c.profile_path}`}
            alt={credits.profile_path}
            style={{height: 200 + 'px'}}
            />
            </>
        ))}
    </Paper>
    </>);
}

export default MovieCredits;