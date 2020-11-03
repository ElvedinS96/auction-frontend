import React from "react";
import "../../../index.css"
import FilterByPrice from "./FilterByPrice";
import FilterByColor from "./FilterByColor";
import FilterBySize from "./FilterBySize";
import ProductCategories from "./ProductCategories"

const Filters = ({ ...props }) => {
    return (

        <div className="filters">
            <ProductCategories
                activeCategory={props.activeCategory}
                activeSubcategory={props.activeSubcategory}
                setCategory={props.setCategory}
                setSubcategory={props.setSubcategory}
                categories={props.filters.categories}
            />
            <FilterByPrice prices={props.filters.prices} />
            <FilterByColor colors={props.filters.colors} setColor={props.setColor} />
            <FilterBySize sizes={props.filters.sizes} setSize={props.setSize} />
        </div>
    )
}

export default Filters;