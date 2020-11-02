import React from "react";
import "../../../index.css"

const FilterByColor = ({ ...props }) => {

    const colors = ["Black", "White", "Green", "Grey", "Red", "Blue", "Orange"]

    const listColors = colors.map((color) =>
        <div className="each-filter-text" onClick={() => alert(color)}>
            {color}
        </div>
    )

    return (
        <div className="filter-box">
            <h5>FILTER BY COLOR</h5>
            <div>
                {listColors}
            </div>
        </div>
    )
}

export default FilterByColor;