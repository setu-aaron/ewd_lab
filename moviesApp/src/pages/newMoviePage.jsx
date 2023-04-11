import { useState, useEffect } from 'react'
import { supabase } from '../supabaseClient'
import { useQuery } from "react-query";
import { getGenres, searchPerson } from "../api/tmdb-api";
import { Grid } from '@mui/material';
import Spinner from '../components/spinner'
import NewMovie from '../components/createNewMovie/newMovie';
import SearchPerson from '../components/searchPerson/searchPerson';
import ListCast from '../components/listNewCastCrew/listCast';
import AddPerson from '../components/personCard/addPerson';


export default function NewMoviePage() {
  const [loading, setLoading] = useState(false)
  const [title, setTitle] = useState("")
  const [overview, setOverview] = useState("")
  const [homePage, setHomePage] = useState("")
  const [tagLine, setTagLine] = useState("")
  const [estimatedRevenue, setEstimatedRevenue] = useState("")
  const [searchValue, setSearchValue] = useState("")
  const [credits, setCredits] = useState({})
  const [chosenGenres, setChosenGenres] = useState([]);
  const [executeSearch, setExecuteSearch] = useState(false);
  const [person, setPerson] = useState({});
  const [cast, setCast] = useState({});
  const [newCastMember, setNewCastMember] = useState(null)
  const [saveMovieNeeded, setSaveMovieNeeded] = useState(false);
  const [userNewMovie, setUserNewMovie] = useState({});
  const { data, error, isLoading, isError } = useQuery("genres", getGenres);

  useEffect (()=>{
    async function runSearch (){
      console.log("new Movie page before search: ", credits)
      let searchData = await searchPerson(searchValue);
      console.log(searchData)
      let results = searchData.results
      let newCredits = {}
      newCredits['cast'] = results
      console.log("Setting New Credits: ", newCredits)
      await setCredits(newCredits);
      console.log("new Movie page after search: ", credits)
    }
    if (executeSearch === true){
      setExecuteSearch(false);
      runSearch();
    }

  }, [executeSearch]);

  useEffect(() => {
    async function updateCast(){
      console.log("New Movie Page: savePersonToRole: ", newCastMember)
      let newCast = cast
      if (newCast.cast === undefined){
        newCast.cast = []
      } 
      newCast.cast.push(newCastMember);
      
      console.log ("New Move page newCast: ", newCast)
      
      setCast(newCast);
    }
    if (newCastMember !== null){
      updateCast();
      setNewCastMember(null);
    }
    
  },[newCastMember])

  useEffect(() => {

    async function saveMovie(){
      const {data: { session },} = await supabase.auth.getSession()   
      if (session){
        console.log("AP: session: ", session)
        const { saveData, saveError } = await supabase
        .from('createdMovies')
        .insert([
          { userId: session.user.id, 
            movieDetails:  userNewMovie},
        ])
        if(saveData){
          setTitle("")
          setOverview("")
          setHomePage("")
          setTagLine("")
          setEstimatedRevenue("")
          setChosenGenres([])
          setCredits({})
          setCast({})
          setPerson({})
          setNewCastMember(null)
          setUserNewMovie({})
          setSaveMovieNeeded(false)
        }

      } else {
        console.log("AP: session is null");
      }
    }

    if (saveMovieNeeded === true){
      setSaveMovieNeeded(false);
      saveMovie();
    }

  }, [saveMovieNeeded])
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

  function saveMovie(e){
    e.preventDefault()
    console.log("New Movie: saveMovie: sess: ", title, overview, homePage, tagLine, estimatedRevenue, chosenGenres)
    let newMovie = {}
    newMovie.title = title
    newMovie.overview = overview
    newMovie.homePage = homePage
    newMovie.tagline = tagLine
    newMovie.revenue = 0
    newMovie.runtime = "tbd"
    newMovie.vote_averate=5
    newMovie.vote_count=0
    newMovie.releaseDate="?"
    let modGenres = []
    console.log("Chosen Genres: ", chosenGenres)
    chosenGenres.forEach((name)=>{
      let newGenre = {}
      newGenre.id = name
      newGenre.name = name
      modGenres.push(newGenre)
    })
    console.log("Mod genres: ", modGenres)
    newMovie.genres = modGenres
    if (cast.length > 0){
      newMovie.poster_path = cast[0].profile_path
    }
    
    newMovie.cast = cast
    setUserNewMovie(newMovie)
    setSaveMovieNeeded(true)
  }

  function savePersonToRole(person){
    setNewCastMember(person)
  }
 
  function onSearch(e){
    console.log("Searching for: ", searchValue)
    setExecuteSearch(true);
  }

  if (loading) {
    return <div>Loading...</div>
  } else {
    return (
      <Grid container>
        <Grid item lg={4} xl={3}>
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
            cast={cast}/>
        </Grid>
        <Grid item lg={4} xl={3}>
          <SearchPerson
          searchValue={searchValue}
          setSearchValue = {setSearchValue}
          onSearch={onSearch}/>
          <ListCast credits={credits}
            setPerson={setPerson} />
        </Grid>
        <Grid item lg={4} xl={3}>
          <AddPerson person={person}
                     setPerson={setPerson}
                     savePersonToRole={savePersonToRole}/>
        </Grid>
      </Grid>
     
        
    )
  }

}