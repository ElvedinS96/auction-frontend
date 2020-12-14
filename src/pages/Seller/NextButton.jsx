import React from "react";
import "../../index.css"


const NextButton = props => {

    return (
        <div>
            <button style={props.isDone ? {
                background: "#8367D8", color: "#FFFFFF", border: "3px solid #8367D8", boxShadow: "3px 3px 0 0 rgba(131,103,216,0.31)"
            } : {}}
                onClick={() => props.onClick()}>
                {props.text} {props.isDone ? "" : <span className="bid-arrow">&#10095;</span>}</button>
        </div >

    )
}

export default NextButton;