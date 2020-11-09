import React from "react";
import "../../../index.css"
import { BiX } from "react-icons/bi"

const FilterByColor = ({ ...props }) => {

    const listColors = props.colors.map((color) =>
        <div className="each-filter-text" onClick={() => { props.setColor(color); props.resetPageNumber() }}>
            {color}
        </div>
    )

    return (
        <div className="filter-box">
            <div className="heading-filter">
                <h5>FILTER BY COLOR</h5 >
                <div className="cancel" onClick={() => props.setColor("")}><BiX /></div>
            </div>
            <div>
                {listColors}
            </div>
        </div>
    )
}

export default FilterByColor;