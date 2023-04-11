import React, { useEffect } from "react";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import { supabase } from "../../supabaseClient";

const DeleteCustomMovie =  ({ movie, setFavoriteChanged }) => {
  const [needsDelete, setNeedsDelete] = React.useState(false);
  useEffect(() => {
    console.log("AF useEffect")
    async function deleteMovie() {
      console.log("AF: Loading is true");
      const {data: { session },} = await supabase.auth.getSession()   
      if (session){
        console.log("AF: session: ", session)
      } else {
        console.log("AF: session is null");
        
      }
      console.log("AF: User ID is: ", session.user.id)

      
      const { data, error } = await supabase
      .from('createdMovies')
      .delete()
      .eq('id', movie.id)

      console.log("calling setFavoriteChanged(true)")

      setFavoriteChanged(true)
    }
    if (needsDelete){
      console.log("AP: session is null, calling get profile ");
      deleteMovie()
    }
  }, [needsDelete])
 
  const onUserSelect = (e) => {
    console.log("Delete requested")
    e.preventDefault();
    setNeedsDelete(true)
  };
  return (
    <IconButton aria-label="add to favorites" onClick={onUserSelect}>
      <DeleteIcon color="primary" fontSize="large" />
    </IconButton>
  );
};

export default DeleteCustomMovie;
