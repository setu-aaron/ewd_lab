import React from "react"
import { Button, Container } from "@mui/material"

const styles = {
    root: {
        margin: "auto",
        width: "50%",
        padding: "10px",
    }

}
export default function Paginator(props){
    console.log("In the paginator", props)
    function createButtons() {
        let current = props.props.currentPage
        let visible = props.props.visiblePages
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
                if (index + lowEnd <= props.props.lastPage){
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
        } else if (newIndex > props.props.lastPage){
            newIndex = props.props.lastPage
        } 
        console.log("In the paginator, onNewPage", newIndex)
        props.props.setCurrentPage(newIndex)
      };

    return (
        <Container sx={styles.root}>
            <Button variant="contained" onClick={()=>onNewPage(props.props.currentPage - 1)} >Prev</Button>
            {createButtons().map((b) => {
                let isCurrent = (b === props.props.currentPage)
                return isCurrent ? (
                   <Button variant="outlined" key={b}>{b}</Button>
                ) : (
                    <Button variant="text" key={b} onClick={()=>onNewPage(b)} >{b}</Button>
                )
                })}
            <Button variant="contained" onClick={()=>onNewPage(props.props.currentPage  + 1)} >Next</Button>
        </Container>
    )
}