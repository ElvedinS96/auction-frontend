import React from "react";
import "../../../index.css"
import { BiX } from "react-icons/bi"

const FilterBySize = ({ ...props }) => {

    const listSizes = props.sizes.map((size) =>
        <div id="shop-filters-size-single" className="each-filter-text" onClick={() => { props.setSize(size); props.resetPageNumber() }}>
            {size}
        </div >
    )

    return (
        <div id="shop-filters-size" className="filter-box filter-size-box">
            <div id="shop-filters-size-heading" className="heading-filter">
                <h5>FILTER BY SIZE</h5 >
                <div className="cancel" onClick={() => props.setSize("")}><BiX /></div>
            </div>
            <div id="shop-filters-size-list">
                {listSizes}
            </div>
        </div>
    )
}

export default FilterBySize;