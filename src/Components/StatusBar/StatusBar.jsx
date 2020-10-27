import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import "../../index.css"

const StatusBar = ({ statusMessage, href, refText, ...props }) => {

    const [message, setMessage] = useState("")
    const [style, setStyle] = useState("")

    useEffect(() => {
        const interval = setInterval(() => {

            if (localStorage.statusMessage != "") {
                setMessage(localStorage.statusMessage)
                setStyle(localStorage.statusClass)
            }
            else {
                setMessage(statusMessage)
                setStyle(props.className)
            }

        }, 1000);
        return () => clearInterval(interval);
    })

    return (
        <div className={style}>
            <div className="status-content">
                <div>{message} <a href={href}>{refText}</a></div>
            </div>
        </div>
    );
}

export default StatusBar;