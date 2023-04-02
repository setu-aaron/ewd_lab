import React from "react";
import TestPerson from "./personData";
import PersonCard from "../components/personCard";

export default {
    title: "Person Details/PersonCard",
    component: PersonCard,

  };


  export const Basic = () => {
    return (
      <PersonCard
        person={TestPerson}
      />
    );
  };
  Basic.storyName = "Default";
  