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

let props = {
    currentPage: currentPage,
    setCurrentPage: setCurrentPage,
    visiblePages: 5,
    lastPage: lastPage
}

export const Basic = () =>{
    return (
        <Paginator 
            props={props} />
    )
};
