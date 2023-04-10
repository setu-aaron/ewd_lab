import React, {useState} from "react";
import Card from "@mui/material/Card";
import { CardContent, CardHeader, CardMedia } from "@mui/material";
import { Paper, Grid, TextField, Button} from "@mui/material";
import Typography from "@mui/material/Typography";
const styles = {
    card: { maxWidth: 850 },
    media: { height: 400, width: 250 },
    biography: {width: 350},
}
export default function PersonCard({person, setPerson, savePersonToRole}) {
    const [role, setRole] = useState("")
    console.log("PersonCard person is: ", person)
    function handleSavePerson() {
        person['character'] = role
        savePersonToRole(person)
        setRole("");
        setPerson({});
    } 

    return (
        <>
        {!person.name ? (
            <></>
            ) : (
        <Paper elevatin={0}>
            <CardHeader
                    title={
                        <Typography 
                            variant="h5" 
                            component="p">
                            {person.name}{" "}
                        </Typography>
                    }
                />
            <Typography 
                variant="body1"     
                color="text.secondary">
                <b>Known For: </b>{person.known_for_department}
            </Typography>
            <Grid container spacing={2}>
                <Grid item xs={6} xl={6}>
                    <Card>
                        <CardMedia
                            sx={styles.media}
                            image={
                                person.profile_path ? `https://image.tmdb.org/t/p/w500/${person.profile_path}` : "/missingImage3.png"
                            }
                        />
                    </Card>
                </Grid>
                <Grid item xs={6} xl={6}>
                <CardContent>
                    <Typography 
                        variant="body1" 
                        color="text.secondary">
                        <b>Popularity:</b> {person.popularity}
                    </Typography>
                    <Typography 
                        sx={styles.biography}
                        variant="body2" 
                        color="text.secondary">
                        {person.biography}
                    </Typography>
                    <p/>
                    <TextField id="outlined-basic" 
                        label="Role" 
                        variant="outlined"
                        value={role}
                        onChange={(e) => setRole(e.target.value)}/>
                    
                    <p/>
                    <Button variant="contained" color="primary" onClick={() =>handleSavePerson()}>
                        Save to Movie
                    </Button>
                </CardContent>
                </Grid>
            </Grid>
        </Paper>
        )}
        </>
    )
}