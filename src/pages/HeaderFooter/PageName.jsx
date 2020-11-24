import React from "react";
import "../../index.css"

const PageName = props => {
    return (
        <div className="page-name">
            <div className="page-name-content">
                <div className="page-name-left">{props.pageName}</div>
                <div className="page-home-nav">
                    <div className="page-name-nav">{props.pageNav}</div>
                </div>
            </div>
        </div>
    )
}

export default PageName;