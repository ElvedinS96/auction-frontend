import React from "react";
import "../../index.css"

const StatusBar = ({ statusMessage, href, refText, ...props }) => {
    return (
        <div {...props}>
            <div className="status-content">
                <div>{statusMessage} <a href={href}>{refText}</a></div>
            </div>
        </div>
    );
}

export default StatusBar;