import React, { useEffect } from "react";
import { MoviesContext } from "../../contexts/moviesContext";
import IconButton from "@mui/material/IconButton";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { supabase } from "../../supabaseClient";

const AddToTVFavouritesIcon = ({ show, setFavoriteChanged }) => {
  const [needsSave, setNeedsSave] = React.useState(false);
  useEffect(() => {
    console.log("AF useEffect")
    async function saveData() {
      console.log("AF: Loading is true");
      const {data: { session },} = await supabase.auth.getSession()   
      if (session){
        //console.log("AF: session: ", session)
      } else {
        //console.log("AF: session is null");
      }
      //console.log("AF: User ID is: ", session.user.id)

      const { data, error } = await supabase
      .from('favoriteShows')
      .insert([
        { showId: show.id, userId: session.user.id},
      ])
      console.log("calling setFavoriteChanged(true)")
      setFavoriteChanged(true)
    }
    if (needsSave){
      console.log("AP: session is null, calling get profile ");
      saveData()
    }
  }, [needsSave])

  const onUserSelect = (e) => {
    e.preventDefault();
    setNeedsSave(true)
  };
  return (
    <IconButton aria-label="add to favorites" onClick={onUserSelect}>
      <FavoriteIcon color="primary" fontSize="large" />
    </IconButton>
  );
};

export default AddToTVFavouritesIcon;
