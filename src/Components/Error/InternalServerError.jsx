import React from "react";
import "../../index.css"

const InternalServerError = ({ ...props }) => {

    return (
        <div>
            <div className="status-code">500</div>
            <div className="err-page-msg">Ooops! Sorry, something went wrong</div>
            <div className="err-page-btn"><button className="basic-button error-button" type="btn" onClick={() => window.location.href = "/"}>GO HOME</button></div>
        </div>
    );
}

export default InternalServerError;