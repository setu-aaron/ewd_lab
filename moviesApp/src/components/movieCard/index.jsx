import React, {useContext, useEffect, useState} from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import CardHeader from "@mui/material/CardHeader";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import FavoriteIcon from "@mui/icons-material/Favorite";
import CalendarIcon from "@mui/icons-material/CalendarTodayTwoTone";
import StarRateIcon from "@mui/icons-material/StarRate";
import Grid from "@mui/material/Grid";
import img from '../../images/film-poster-placeholder.png'
import { Link } from "react-router-dom";
import Avatar from "@mui/material/Avatar";
import { MoviesContext } from "../../contexts/moviesContext";
import { supabase } from "../../supabaseClient";


const styles = {
  card: { maxWidth: 345 },
  media: { height: 500 },
  avatar: {
    backgroundColor: "rgb(255, 0, 0)",
  },
};

export default function MovieCard({movie, action,baseUrl, favoriteChanged}) {
  //const { favourites} = useContext(MoviesContext);
  const [favourites, setFavourites] = useState([]);
  const [ needsQuery, setNeedsQuery ] = useState(true);
  const [isQuerying, setIsQuerying] = useState(true);
  //console.log("MC: movie: ", movie.title)
  //console.log("MC: favoriteChanged: ", favoriteChanged)
  useEffect(() => {
    //console.log("MC useEffect")
    async function queryTable() {
      //console.log("MC: Loading is true");
      const {data: { session },} = await supabase.auth.getSession()   
      if (session){
        //console.log("MC: session: ", session)
      } else {
        //console.log("MC: session is null");
      }
      //console.log("MC: User ID is: ", session.user.id)

      console.log("MC: calling queryTable");
      let { data: favoriteMovies, error } = await supabase
      .from('favoriteMovies')
      .select('movieId')
      .eq('userId', session.user.id)

      setFavourites(favoriteMovies.map((m) => m.movieId));
      setIsQuerying(false);
    }

    if (needsQuery){
      //console.log("MC: needs query ");
      queryTable();
      setNeedsQuery(false);
      setIsQuerying(true);
    }
  }, [needsQuery])

  useEffect(() => {
    if (favoriteChanged){
      setNeedsQuery(true);
    }
  }, [favoriteChanged])
  
  if (favourites.find((id) => id === movie.id)) {
    movie.favourite = true;
    console.log("MC: movie is favourite: ", movie.title)

  } else {
    movie.favourite = false;
  }
  


  return (
    <Card sx={styles.card}>
          <CardHeader
            sx={styles.header}
            avatar={
              movie.favourite ? (
                <Avatar sx={styles.avatar}>
                  <FavoriteIcon />
                </Avatar>
              ) : null
            }
            title={
              <Typography variant="h5" component="p">
                {movie.title}{" "}
              </Typography>
            }
          />
      <Link to={`${baseUrl}${movie.id}/${movie.favourite}`}>
      <CardMedia
        sx={styles.media}
        image={
          movie.poster_path
            ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}`
            : img
        }
      />
      </Link>
      <CardContent>
        <Grid container>
          <Grid item xs={6}>
            <Typography variant="h6" component="p">
              <CalendarIcon fontSize="small" />
              {movie.release_date}
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="h6" component="p">
              <StarRateIcon fontSize="small" />
              {"  "} {movie.vote_average}{" "}
            </Typography>
          </Grid>
        </Grid>
      </CardContent>
      <CardActions disableSpacing>
        {action(movie)}
        <Link to={`${baseUrl}${movie.id}/${movie.favourite}`}>
          <Button variant="outlined" size="medium" color="primary">
            More Info ...
          </Button>
        </Link>
      </CardActions>
    </Card>
  );
}
