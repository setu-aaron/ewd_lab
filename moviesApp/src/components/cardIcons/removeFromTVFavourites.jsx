import React, { useEffect, useState } from "react";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import { supabase } from "../../supabaseClient";

const RemoveFromFavouritesIcon = ({ show, setNeedsQuery }) => {
  const [needsDelete, setNeedsDelete] = useState(false);

  useEffect(() => {
    console.log("RF useEffect")
    async function deleteRecord() {
      console.log("RF: Loading is true");
      const {data: { session },} = await supabase.auth.getSession()   
      if (session){
        console.log("RF: session: ", session)
      } else {
        console.log("RF: session is null");
      }
      console.log("RF: User ID is: ", session.user.id)


    const { data, error } = await supabase
      .from('favoriteShows')
      .delete()
      .eq('showId', show.id)

      setNeedsQuery(true);
    } 

    if (needsDelete){
      console.log("RF: needs delete ");
      deleteRecord();
      setNeedsDelete(false);
    }
  }, [needsDelete])

  const onUserRequest = (e) => {
    e.preventDefault();
    setNeedsDelete(true)
  };

return (
  <IconButton
    aria-label="remove from favorites"
    onClick={onUserRequest}
  >
    <DeleteIcon color="primary" fontSize="large" />
  </IconButton>
);
};

export default RemoveFromFavouritesIcon;
