import React from "react";
import "../../../index.css"
import { useState } from "react";

const FilterByPrice = ({ ...props }) => {

    const [minPrice, setMinPrice] = useState(0);
    const [maxPrice, setMaxPrice] = useState(0);

    function calculateWidth() {
        return (100 / props.prices.pricesCount.length) + "%"
    }

    function calculateHeight(count) {
        return ((count / Math.max.apply(Math, props.prices.pricesCount.map(function (o) { return o[0]; }))) * 100) + "%"
    }

    const listHistogram = props.prices.pricesCount.map((price) =>
        <div className="chart-bar" style={{ "width": calculateWidth(), height: calculateHeight(price[0]) }}></div>
    )

    return (
        <div className="filter-box">
            <h5>FILTER BY PRICE</h5>
            <div className="histogram">
                {listHistogram}
            </div>
        </div>
    )
}

export default FilterByPrice;