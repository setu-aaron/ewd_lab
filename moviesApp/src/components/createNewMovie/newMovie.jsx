import React, {useState} from 'react';
import { Button, Card, CardActions, CardContent, CardHeader, Chip, Grid, InputLabel, MenuItem, Paper, Select, TextField } from '@mui/material';

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
  card: { maxWidth: 500
   }
}

export default function NewMovie({title, setTitle, 
                                  overview, setOverview, 
                                  homePage, setHomePage, 
                                  tagLine, setTagLine, 
                                  estimatedRevenue, setEstimatedRevenue,
                                  genres, chosenGenres, setChosenGenres,
                                  saveMovie
                                }) {
    
    const [selectedGenres, setSelectedGenres] = useState("All");
    const handleGenreChange = e => {
        console.log("Genre changed to: ", e.target.value)
        setSelectedGenres(e.target.value);
      };
      function addGenre(e){
        e.preventDefault()
        setChosenGenres([...chosenGenres, selectedGenres])
      }
    
    return (
        <Card sx={styles.card} spacing={5}>
        <CardHeader title="Create New Movie" />
        <CardContent>
        
          <TextField id="outlined-basic" 
                    label="Movie Title"
                    variant="outlined"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    style = {{width: 400}} />
        
        <p></p>
        <TextField id="outlined-basic" 
            label="Movie Overview" 
            variant="outlined"
            multiline
            rows={4}
            value={overview}
            onChange={(e) => setOverview(e.target.value)}
            style = {{width: 400}} />
        
        <p></p>
        <TextField id="outlined-basic" 
            label="Movie Home Page"
            variant="outlined"
            value={homePage}
            onChange={(e) => setHomePage(e.target.value)}
            style = {{width: 400}} />
        
        <p></p>
            <TextField id="outlined-basic" 
                label="Movie Tagline"
                variant="outlined"
                value={tagLine}
                onChange={(e) => setTagLine(e.target.value)}
                style = {{width: 400}} />
        
        <p></p>
            <TextField id="outlined-basic" 
                label="How much money will this movie make?"
                variant="outlined"
                value={estimatedRevenue}
                onChange={(e) => setEstimatedRevenue(e.target.value)}
                style = {{width: 400}} />
        
        <p></p>
        <InputLabel id="genre-label">Genre</InputLabel>

        <Grid container spacing={5}>
            <Grid item>
                <Select
                    labelId="genre-label"
                    id="genre-select"
                    value={selectedGenres}
                    onChange={handleGenreChange}>
                    {genres.map((genre) => {
                        return (
                            <MenuItem key={genre.name} value={genre.name}>
                            {genre.name}
                            </MenuItem>
                        );
                    })}
                </Select>
            </Grid>
            <Grid item>
                <Button onClick={(e) => addGenre(e)} variant="contained">
                    Add Genre
                </Button>
            </Grid>
        </Grid>
        
        <Paper component="ul" sx={styles.chipSet}>
        <li>
          <Chip label="Genres" sx={styles.chipLabel} color="primary" />
        </li>
        {chosenGenres.map((g) => (
          <li key={g}>
            <Chip label={g}  />
          </li>
        ))}
      </Paper>
        </CardContent>
        <CardActions>
        <Button onClick={(e) => saveMovie(e)} variant="contained" size="medium" color="primary">
           Save Movie
          </Button>
        </CardActions>
      </Card>
    )
}
