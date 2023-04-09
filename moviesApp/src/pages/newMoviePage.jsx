import { useState, useEffect } from 'react'
import { supabase } from '../supabaseClient'
import Spinner from '../components/spinner'
import { useQuery } from "react-query";
import { getGenres } from "../api/tmdb-api";
import NewMovie from '../components/createNewMovie/newMovie';



export default function NewMoviePage() {
  const [loading, setLoading] = useState(false)
  const [title, setTitle] = useState("")
  const [overview, setOverview] = useState("")
  const [homePage, setHomePage] = useState("")
  const [tagLine, setTagLine] = useState("")
  const [estimatedRevenue, setEstimatedRevenue] = useState("")
  const [sess, setSess] = useState(null)
  
  const [chosenGenres, setChosenGenres] = useState([]);

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
    )
  }

}