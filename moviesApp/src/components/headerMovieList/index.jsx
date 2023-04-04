import React from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";

const styles = {
  root: {
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center",
    flexWrap: "wrap",
    marginBottom: 1.5,
  },
};

const Header = (props) => {
  const title = props.title
  const pageId = props.pageId
  const baseUrl = props.baseUrl
  let page = pageId
  
  if (pageId === undefined) {
    page = 1
    
  }
  let nextPage = Number(page) + 1
  let lastPage = Number(page) - 1  
  return (
    <Paper component="div" sx={styles.root}>
      {page > 1 ? (
        <IconButton href={`${baseUrl}page/${lastPage}`} aria-label="go back" >
          <ArrowBackIcon color="primary" fontSize="large" />
        </IconButton>
      ) : (
        <IconButton aria-label="go back" >
          <ArrowBackIcon color="disabled" fontSize="large" />
        </IconButton>
      )}
      <Typography variant="h4" component="h3">
        {title}
      </Typography>
      <IconButton href={`${baseUrl}page/${nextPage}`}  aria-label="go forward" >
        <ArrowForwardIcon color="primary" fontSize="large" />
      </IconButton>
    </Paper>
  );
};

export default Header;
