import { useState, useEffect } from 'react'
import { supabase } from '../supabaseClient'
import { Button, Card, CardActions, CardContent, CardHeader, Grid, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import Spinner from '../components/spinner'
import { useQuery } from "react-query";
import { getGenres } from "../api/tmdb-api";

const styles = {
  card: { maxWidth: 500
   },
}

export default function NewMoviePage() {
  const [loading, setLoading] = useState(false)
  const [title, setTitle] = useState(null)
  const [overview, setOverview] = useState(null)
  const [homePage, setHomePage] = useState(null)
  const [tagLine, setTagLine] = useState(null)
  const [estimatedRevenue, setEstimatedRevenue] = useState(null)
  const [sess, setSess] = useState(null)
  const [selectedGenres, setSelectedGenres] = useState(null)


  const { data, error, isLoading, isError } = useQuery("genres", getGenres);

  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    return <h1>{error.message}</h1>;
  }

  const genres = data.genres;
  if(genres[0].name !== "All"){
    genres.unshift({id: 0, name: "All"})
  }

  const handleUserInput = (e, type, value) => {
    e.preventDefault()
    props.onUserInput(type, value)
  } 

  const handleGenreChange = e => {
    console.log("Genre changed to: ", e.target.value)
    setSelectedGenres(e.target.value);
  };

//   useEffect(() => {
//     async function getProfile() {
//       setLoading(true)
//       console.log("AP: Loading is true");
    //   const {data: { session },} = await supabase.auth.getSession()   
    //   if (session){
    //     console.log("AP: session: ", session)
    //     setSess(session);
    //   } else {
    //     console.log("AP: session is null");
        
    //   }
    //   console.log("AP: User ID is: ", session.user.id)
    //   let { data, error } = await supabase
    //     .from('profiles')
    //     .select(`username, website, avatar_url`)
    //     .eq('id', session.user.id)
    //     .single()

    //   if (error) {
    //     console.warn(error)
    //   } else if (data) {
        
    //   }

//       setLoading(false)
//     }
//     if (sess == null){
//       console.log("AP: session is null, calling get profile ");
//       getProfile()
//     }
//   }, [sess])

  async function updateProfile(event) {
    event.preventDefault()

    setLoading(true)
    console.log("AP: updateProfile: sess: ", sess)
 
    
   

    let { error } = await supabase.from('profiles').upsert(updates)

    if (error) {
      alert(error.message)
    }
    setLoading(false)
  }

  if (loading) {
    return <div>Loading...</div>
  } else {
    return (
      <Card sx={styles.card} spacing={5}>
        <CardHeader title="Create New Movie" />
        <CardContent>
        <p>
          <TextField id="outlined-basic" 
                    label="Movie Title"
                    variant="outlined"
                    onChange={(e) => setTitle(e.target.value)}
                    style = {{width: 400}} />
        </p>
        <p>
        <TextField id="outlined-basic" 
            label="Movie Overview" 
            variant="outlined"
            multiline
            rows={4}
            rowsMax={10}
            onChange={(e) => setOverview(e.target.value)}
            style = {{width: 400}} />
        </p>
        <p>
        <TextField id="outlined-basic" 
            label="Movie Home Page"
            variant="outlined"
            onChange={(e) => setHomePage(e.target.value)}
            style = {{width: 400}} />
        </p>
        <p>
            <TextField id="outlined-basic" 
                label="Movie Tagline"
                variant="outlined"
                onChange={(e) => setTagLine(e.target.value)}
                style = {{width: 400}} />
        </p>
        <p>
            <TextField id="outlined-basic" 
                label="How much money will this movie make?"
                variant="outlined"
                onChange={(e) => setEstimatedRevenue(e.target.value)}
                style = {{width: 400}} />
        </p>
        <p>
        <InputLabel id="genre-label">Genre</InputLabel>
          <Select
            labelId="genre-label"
            id="genre-select"
            value={selectedGenres}
            onChange={handleGenreChange}>
            {genres.map((genre) => {
              return (
                <MenuItem key={genre.id} value={genre.id}>
                  {genre.name}
                </MenuItem>
              );
            })}
          </Select>
        </p>
        </CardContent>
        <CardActions>
        <Button onClick={(e) => updateProfile(e)} variant="contained" size="medium" color="primary">
           Update Account
          </Button>
        </CardActions>
      </Card>
    )
  }

}