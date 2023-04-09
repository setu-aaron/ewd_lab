import React from "react";
import NewMovie from "../components/createNewMovie/newMovie";


export default {
    title: "Create Movie/NewMovie",
    component: NewMovie,

  };

  const chosenGenres = ["Action", "Comedy"];
  
  function setChosenGenres(genre) {
    console.log("New Genres should be ", genre)
  }
  const genres = [
      {id: 1, name: "All"}, 
      {id: 2, name: "Comedy"}, 
      {id: 3, name: "Drama"}, 
      {id: 4, name: "Horror"}, 
      {id: 5, name: "Romance"}, 
      {id: 6, name: "Thriller"}];

  function saveMovie(e){
      e.preventDefault()
      console.log("New Movie: saveMovie: sess: ", title, overview, homePage, tagLine, estimatedRevenue, chosenGenres)
  }
  let aTitle = "New Movie Title";
  const title = aTitle;
  const setTitle = (e) => {
    console.log(e)
    aTitle = e;
  };
  const overview = "New Movie Overview";
  const setOverview = (e) => {}
  const homePage = "New Movie Home Page";
  const setHomePage = (e) => {}
  const tagLine = "New Movie Tag Line";
  const setTagLine = (e) => {}
  const estimatedRevenue = 1000000;
  const setEstimatedRevenue = (e) => {}
  
  export const Basic = () => {
    return (
      <NewMovie
        title={title}   
        setTitle={setTitle}
        overview={overview}
        setOverview={setOverview}
        homePage={homePage}
        setHomePage={setHomePage}
        tagLine={tagLine}
        setTagLine={setTagLine}
        estimatedRevenue={estimatedRevenue}
        setEstimatedRevenue={setEstimatedRevenue}
        genres={genres}
        chosenGenres={chosenGenres}
        setChosenGenres={setChosenGenres}
        saveMovie={saveMovie}
      />
    );
  };
  Basic.storyName = "Default";
  