import React from "react";
import SearchIcon from "@mui/icons-material/Search";
import { Button, Card, CardActions, CardContent, CardHeader, Chip, Grid, IconButton, MenuItem, Paper, Select, TextField } from '@mui/material';

const styles = {
  card: { maxWidth: 500
   }
}

export default function SearchPerson({searchValue, setSearchValue, onSearch}) {

        return (
            <Paper sx={styles.card} elevation={0} spacing={5} >
                <CardContent>
                <TextField  
                    label="Search for cast and crew"
                    variant="standard"
                    value={searchValue}
                    onChange={(e) => setSearchValue(e.target.value)}
                    style = {{width: 350}} />
                <IconButton aria-label="add to favorites" onClick={onSearch}>
                    <SearchIcon color="primary" fontSize="large" />
                </IconButton>
            </CardContent>

            </Paper>
                
            
        )   
};