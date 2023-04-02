import React, {useContext} from "react";
import Card from "@mui/material/Card";
import { CardContent, CardHeader, CardMedia } from "@mui/material";
import Typography from "@mui/material/Typography";
const styles = {
    card: { maxWidth: 750 },
    media: { height: 600, width: 350 },
    biography: {width: 350},
}
export default function PersonCard({person}) {

    return (
        <Card sx={styles.card}>
            <CardHeader
                title={
                    <Typography 
                        variant="h5" 
                        component="p">
                        {person.name}{" "}
                    </Typography>
                }
            />
            <div style={{float: "left"}}>
            <Typography 
                variant="body1"     
                color="text.secondary">
                <b>Known For: </b>{person.known_for_department}
            </Typography>
                <CardMedia
                    sx={styles.media}
                    image={
                        person.profile_path ? `https://image.tmdb.org/t/p/w500/${person.profile_path}` : "/missingImage3.png"
                    }
                />
            </div>
            <div style={{float: "right"}}>
                <CardContent>
                    <Typography 
                        variant="body1"     
                        color="text.secondary">
                        <b>Birthday:</b> {person.birthday}
                    </Typography>
                    <Typography 
                        variant="body1"     
                        color="text.secondary">
                        <b>Birth Place:</b>{person.place_of_birth}
                    </Typography>
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
                </CardContent>
            </div>
        </Card>
    )
}