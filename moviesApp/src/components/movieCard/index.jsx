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


const styles = {
  card: { maxWidth: 345 },
  media: { height: 500 },
  avatar: {
    backgroundColor: "rgb(255, 0, 0)",
  },
};

export default function MovieCard({movie, action, baseUrl, favorites}) {
  //const { favourites} = useContext(MoviesContext);
  //console.log("MC: movie: ", movie.title)
  //console.log("MC: favoriteChanged: ", favoriteChanged)
  
  if (favorites.find((id) => id === movie.id)) {
    movie.favourite = true;
  } else {
    movie.favourite = false;
  }

  //console.log("Movie Card: ", movie);

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
            {movie.release_date ? (
              <Typography variant="h6" component="p">
                <CalendarIcon fontSize="small" />
                {movie.release_date}
              </Typography>
            ) : (<></>)
            }
          </Grid>
          <Grid item xs={6}>
          {movie.vote_average ? (
            <Typography variant="h6" component="p">
              <StarRateIcon fontSize="small" />
              {"  "} {movie.vote_average}{" "}
            </Typography>
            ) : (<></>)
          }
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
