import React from "react";
import "../../index.css"

const StatusBar = ({ statusMessage, href, refText, ...props }) => {
    return (
        <div {...props}>
            <label>
                {statusMessage} <a href={href}>{refText}</a>
            </label>
        </div>
    );
}

export default StatusBar;