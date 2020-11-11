import React from "react";
import "../../../index.css"
import { useState } from "react";
import { Range } from 'rc-slider'
import 'rc-slider/assets/index.css';
import 'rc-tooltip/assets/bootstrap.css';
import { useEffect } from "react";
import { BiX } from "react-icons/bi"

const FilterByPrice = ({ ...props }) => {

    const [rangeMin, setRangeMin] = useState(0);
    const [rangeMax, setRangeMax] = useState(0);
    const [minPrice, setMinPrice] = useState(0);
    const [maxPrice, setMaxPrice] = useState(0);
    const [reload, setReload] = useState(false);

    useEffect(() => {

        if (props.prices.pricesCount.length == 0) {
            setReload(!reload)
        }
        else {
            setRangeMin(props.prices.minPrice)
            setRangeMax(props.prices.maxPrice)
            setMinPrice(props.prices.minPrice)
            setMaxPrice(props.prices.maxPrice)
        }
    }, [reload], [])

    function calculateWidth() {
        return (100 / props.prices.pricesCount.length) + "%"
    }

    function calculateHeight(count) {
        return ((count / Math.max.apply(Math, props.prices.pricesCount.map(function (o) { return o[0]; }))) * 100) + "%"
    }

    const listHistogram = props.prices.pricesCount.map((price) =>
        <div className="chart-bar" style={{ "width": calculateWidth(), height: calculateHeight(price[0]) }}></div>
    )

    const handleChange = (value) => {
        setMinPrice(value[0]);
        setMaxPrice(value[1]);
    }

    const handleAfterChange = () => {
        props.resetPageNumber()
        props.setMinPrice(minPrice)
        props.setMaxPrice(maxPrice)
    }

    function cancelPrice() {
        props.setMinPrice(-1)
        props.setMaxPrice(-1)
        setMinPrice(rangeMin)
        setMaxPrice(rangeMax)
    }

    return (
        <div className="filter-box">
            <div className="heading-filter">
                <h5>FILTER BY PRICE</h5>
                <div className="cancel" onClick={() => cancelPrice()}><BiX /></div>
            </div>

            <div className="histogram">
                {listHistogram}
            </div>
            <Range
                className="slider"
                min={rangeMin}
                max={rangeMax}
                allowCross={false}
                value={[minPrice, maxPrice]}
                onChange={handleChange}
                onAfterChange={handleAfterChange}
            />
            <div className="price-labels">
                <label>${minPrice} - ${maxPrice}</label>
                <label>The average price is ${Math.round(props.prices.avgPrice)}. </label>
            </div>
        </div>
    )
}

export default FilterByPrice;