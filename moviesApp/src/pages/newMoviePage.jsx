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
  const [sess, setSess] = useState(null)
  const [credits, setCredits] = useState({})
  const [chosenGenres, setChosenGenres] = useState([]);
  const [executeSearch, setExecuteSearch] = useState(false);
  const [person, setPerson] = useState({});
  const [cast, setCast] = useState({});
  const [newCastMember, setNewCastMember] = useState(null)

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

  function saveMovie(e){
    e.preventDefault()
    console.log("New Movie: saveMovie: sess: ", title, overview, homePage, tagLine, estimatedRevenue, chosenGenres)
  }

  function savePersonToRole(person){
    setNewCastMember(person)
  }
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

  function onSearch(e){
    console.log("Searching for: ", searchValue)
    setExecuteSearch(true);
  }

  if (loading) {
    return <div>Loading...</div>
  } else {
    return (
      <Grid container>
        <Grid item xl={3}>
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
        <Grid item xl={3}>
          <SearchPerson
          searchValue={searchValue}
          setSearchValue = {setSearchValue}
          onSearch={onSearch}/>
          <ListCast credits={credits}
            setPerson={setPerson} />
        </Grid>
        <Grid item xl={3}>
          <AddPerson person={person}
                     setPerson={setPerson}
                     savePersonToRole={savePersonToRole}/>
        </Grid>
      </Grid>
     
        
    )
  }

}