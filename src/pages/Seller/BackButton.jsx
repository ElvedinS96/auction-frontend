import React from "react";
import "../../index.css"


const BackButton = props => {

    return (
        <div>
            <button
                onClick={props.onClick}
                className={props.className ? props.className : ""}
            ><span className="back-arrow">&#10094;</span> BACK</button>
        </div >

    )
}

export default BackButton;