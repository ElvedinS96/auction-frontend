import React from "react";
import "../../../index.css"

const FilterBySize = ({ ...props }) => {

    const sizes = ["Small", "Medium", "Large", "Extra Large"]

    const listSizes = sizes.map((size) =>
        <div className="each-filter-text" onClick={() => alert(size)}>
            {size}
        </div >
    )

    return (
        <div className="filter-box">
            <h5>FILTER BY SIZE</h5>
            <div>
                {listSizes}
            </div>
        </div>
    )
}

export default FilterBySize;