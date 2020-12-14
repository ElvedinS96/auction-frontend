import React from "react";
import "../../index.css"


const ProgressBar = props => {

    return (
        <div className="wizard-progress-bar">
            <div className="out-circle out-circle-active">
                <div className="in-circle in-circle-active"></div>
            </div>
            <div className="progress-line-wrapper">
                <div className={props.step >= 2 ? "progress-line progress-line-active" : "progress-line progress-line-inactive"}></div>
            </div>
            <div className={props.step >= 2 ? "out-circle out-circle-active" : "out-circle out-circle-inactive"}>
                <div className={props.step >= 2 ? "in-circle in-circle-active" : "in-circle in-circle-inactive"}></div>
            </div>
            <div className="progress-line-wrapper">
                <div className={props.step == 3 ? "progress-line progress-line-active" : "progress-line progress-line-inactive"}></div>
            </div>
            <div className={props.step == 3 ? "out-circle out-circle-active" : "out-circle out-circle-inactive"}>
                <div className={props.step == 3 ? "in-circle in-circle-active" : "in-circle in-circle-inactive"}></div>
            </div>
        </div>

    )
}

export default ProgressBar;