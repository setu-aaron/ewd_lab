import React from "react";
import SearchPerson from "../components/searchPerson/searchPerson";


export default {
    title: "Create Movie/SearchPerson",
    component: SearchPerson,

  };

  let title=""
  function setTitle(aTitle){
    console.log(aTitle)
    title=aTitle
  }
  function onSearch(searchString){
    console.log("searching for: ", searchString)
  }

  export const Basic = () => {
    return (
      <SearchPerson
        title={title}
        setTitle = {setTitle}
        onSearch={onSearch}/>
    );
  };
  Basic.storyName = "Default";
  