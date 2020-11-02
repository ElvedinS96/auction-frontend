import React from "react";
import "../../../index.css"
import FilterByPrice from "./FilterByPrice";
import FilterByColor from "./FilterByColor";
import FilterBySize from "./FilterBySize";
import ProductCategories from "./ProductCategories"

const Filters = ({ ...props }) => {
    return (
        <div className="filters">
            <ProductCategories />
            <FilterByPrice />
            <FilterByColor />
            <FilterBySize />
        </div>
    )
}

export default Filters;