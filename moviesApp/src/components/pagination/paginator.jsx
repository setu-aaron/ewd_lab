import React from "react"
import { Button, Container } from "@mui/material"

const styles = {
    root: {
        margin: "auto",
        width: "50%",
        padding: "10px",
    }

}
function Paginator({props, baseUrl}){
    function createButtons() {
        let current = props.currentPage
        let visible = props.visiblePages
        let lowEnd = current - Math.floor(visible/2) 
           
        let buttons = []
        if (lowEnd < 1){
            let index = 0
            while(index < visible){
                buttons.push(index + 1)
                index++
            }
        }
        else {
            let index = 0
            while(index < visible){
                if (index + lowEnd <= props.lastPage){
                    let label = lowEnd + index
                    buttons.push(label)
                } else {
                    break;
                }
                index++
            }
        }
        return buttons
    }


    const onNewPage = (newIndex) => {
        if (newIndex === 0){
            newIndex = 1 
        } else if (newIndex > props.lastPage){
            newIndex = props.lastPage
        } 
        return newIndex;
      };

    return (
        <Container sx={styles.root}>
            {props.currentPage > 0 ? (
                <>
               
            <Button href={`${baseUrl}page/${onNewPage(props.currentPage - 1)}`} variant="contained" onClick={()=>onNewPage(props.currentPage - 1)} >Prev</Button>
            {createButtons().map((b) => {
                let isCurrent = (b === props.currentPage)
                return isCurrent ? (
                   <Button variant="outlined" key={b}>{b}</Button>
                ) : (
                    <Button variant="text" key={b} href={`${baseUrl}page/${onNewPage(b)}`} >{b}</Button>
                )
                })}
            <Button href={`${baseUrl}page/${onNewPage(props.currentPage + 1)}`} variant="contained" onClick={()=>onNewPage(props.currentPage + 1)} >Next</Button>
             </>
            ) : (<></>)
            }
        </Container>
    )
}
export default Paginator;