import { useEffect, useState } from 'react'
import { supabase } from '../supabaseClient'
import Typography from "@mui/material/Typography";
import { Button, Card, CardActions, Grid, TextField } from '@mui/material';
import { saveUser } from "../api/tmdb-api";
import { useQuery } from "react-query";


const styles = {
  card: { maxWidth: 500
   },
}

export default function Auth() {
  const [loading, setLoading] = useState(false)
  const [email, setEmail] = useState('')
  const [sess, setSess] = useState(null)
  const [username, setUsername] = useState(null)

  useEffect(() => {
    async function getProfile() {
      setLoading(true)
      const {data: { session },} = await supabase.auth.getSession()   
      if (session){
        setSess(session);
        let { data, error } = await supabase
          .from('profiles')
          .select(`username, website, avatar_url`)
          .eq('id', session.user.id)
          .single()

        if (error) {
          console.warn(error)
        } else if (data) {
          setUsername(data.username)
        }

      }
      setLoading(false)
    }

    if (sess == null){
      console.log("session is null");
      getProfile()
    }
  }, [sess])


  const handleLogin = async (event) => {
    event.preventDefault()

    setLoading(true)
    const { error } = await supabase.auth.signInWithOtp({ email })
   
    //const { data, saveError, isLoading, isError } = useQuery(["user", email], saveUser);

    saveUser(email);


    if (error) {
      alert(error.error_description || error.message)
    } else {
      // update the api with the user's e-mail
      alert('Check your email for the login link!')
    }
    setLoading(false)
  }

  function signOut(){
    supabase.auth.signOut()
    setSess(null)
  }

  if (sess == null){
    return (
      <Card sx={styles.card}>
        <Typography variant="h4" component="p">
          Login
        </Typography>
        <Typography variant="h5" component="p">
          Sign in via magic link with your email below
        </Typography>
        <TextField id="outlined-basic" 
                   label="Your Email" 
                   variant="outlined"
                   value={email}
                   style = {{width: 400}}
                   onChange={(e) => setEmail(e.target.value)} />
        <CardActions>
          <Button onClick={((e)=> handleLogin(e))} variant="contained">Send magic link</Button>
        </CardActions>
      </Card>
    )
  }
  else {
    return (
      <Grid container spacing={2} direction={"column"} alignItems={"left"}>
          <Grid item>
          <Button href="/account" variant="contained" size="medium" color="primary">
           Manage Account
          </Button>
        
        </Grid>
        <Grid item>
        <Button variant="contained" onClick={() => signOut()}>
          Sign Out
        </Button>
        </Grid>
        </Grid>
    )
  }

}