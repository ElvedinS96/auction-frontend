import React from "react";
import "../../index.css"

const NotFound = ({ ...props }) => {

    return (
        <div>
            <div className="status-code">404</div>
            <div className="err-page-msg">Ooops! Looks like the page is Not Found</div>
        </div>
    );
}

export default NotFound;