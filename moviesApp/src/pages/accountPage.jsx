import { useState, useEffect } from 'react'
import { supabase } from '../supabaseClient'
import { Button, Card, CardActions, CardContent, CardHeader, Grid, TextField } from '@mui/material';

const styles = {
  card: { maxWidth: 500
   },
}

export default function Account() {
  const [loading, setLoading] = useState(true)
  const [username, setUsername] = useState(null)
  const [website, setWebsite] = useState(null)
  const [avatar_url, setAvatarUrl] = useState(null)
  const [sess, setSess] = useState(null)

  console.log("Inside the Account page");
  useEffect(() => {
    console.log("Account Page useEffect")
    async function getProfile() {
      setLoading(true)
      console.log("AP: Loading is true");
      const {data: { session },} = await supabase.auth.getSession()   
      if (session){
        console.log("AP: session: ", session)
        setSess(session);
      } else {
        console.log("AP: session is null");
        
      }
      console.log("AP: User ID is: ", session.user.id)
      let { data, error } = await supabase
        .from('profiles')
        .select(`username, website, avatar_url`)
        .eq('id', session.user.id)
        .single()

      if (error) {
        console.warn(error)
      } else if (data) {
        setUsername(data.username)
        setWebsite(data.website)
        setAvatarUrl(data.avatar_url)
      }

      setLoading(false)
    }
    if (sess == null){
      console.log("AP: session is null, calling get profile ");
      getProfile()
    }
  }, [sess])

  async function updateProfile(event) {
    event.preventDefault()

    setLoading(true)
    console.log("AP: updateProfile: sess: ", sess)
 
    console.log("user: ", sess.user)
    const updates = {
      id: sess.user.id,
      username,
      website,
      avatar_url,
      updated_at: new Date(),
    }

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
        <CardHeader title="Manage Account" />
        <CardContent>
        <p>
          <TextField id="outlined-basic" 
                    label="Your Email" 
                    variant="outlined"
                    value={sess.user.email}
                    disabled
                    style = {{width: 400}} />
        </p>
        <p>
        <TextField id="outlined-basic" 
            label="Enter your name" 
            variant="outlined"
            value={username || ''}
            onChange={(e) => setUsername(e.target.value)}
            style = {{width: 400}} />
        </p>
        <p>
        <TextField id="outlined-basic" 
            label="Enter your website" 
            variant="outlined"
            value={website || ''}
            onChange={(e) => setWebsite(e.target.value)}
            style = {{width: 400}} />
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