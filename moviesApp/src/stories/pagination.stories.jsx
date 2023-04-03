import React from "react";
import Paginator from "../components/pagination/paginator";


export default {
    title: "Home Page/Paginator",
    component: Paginator
};
let cPage = 1;
let lastPage = 10;

function setCurrentPage(page){
    console.log("In the story Page current page changing to ", page)
    console.log("In the story Page current page was", cPage)
    cPage = page;
}
function currentPage(){
    return cPage;
}

const paginationProps = {
    currentPage: 1,
    visiblePages: 5,
    lastPage: 10,
    baseUrl: "/movies/page/",
  }

export const Basic = () =>{
    return (
        <Paginator 
            props={paginationProps} />
    )
};
