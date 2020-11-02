import React from "react";
import "../../../index.css"
import { Range } from "rc-slider"
import { useState } from "react";

const FilterByPrice = ({ ...props }) => {

    const [minPrice, setMinPrice] = useState(0);
    const [maxPrice, setMaxPrice] = useState(0);

    const prices = [{ price: 50, count: 1 }, { price: 50, count: 4 }, { price: 100, count: 7 }, { price: 200, count: 4 },
    { price: 300, count: 8 }, { price: 600, count: 15 }, { price: 650, count: 12 },
    { price: 700, count: 2 }, { price: 800, count: 4 }, { price: 1000, count: 2 }]

    function calculateWidth() {
        return (100 / prices.length) + "%"
    }

    function calculateHeight(count) {
        return ((count / Math.max.apply(Math, prices.map(function (o) { return o.count; }))) * 100) + "%"
    }

    const listHistogram = prices.map((price) =>
        <div className="chart-bar" style={{ "width": calculateWidth(), height: calculateHeight(price.count) }}></div>
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