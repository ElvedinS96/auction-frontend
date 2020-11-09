import React from "react";
import "../../../index.css"
import { BiX } from "react-icons/bi"

const FilterBySize = ({ ...props }) => {

    const listSizes = props.sizes.map((size) =>
        <div className="each-filter-text" onClick={() => { props.setSize(size); props.resetPageNumber() }}>
            {size}
        </div >
    )

    return (
        <div className="filter-box">
            <div className="heading-filter">
                <h5>FILTER BY SIZE</h5 >
                <div className="cancel" onClick={() => props.setSize("")}><BiX /></div>
            </div>
            <div>
                {listSizes}
            </div>
        </div>
    )
}

export default FilterBySize;