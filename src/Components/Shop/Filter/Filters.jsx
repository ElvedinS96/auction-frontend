import React from "react";
import "../../../index.css"
import FilterByPrice from "./FilterByPrice";
import FilterByColor from "./FilterByColor";
import FilterBySize from "./FilterBySize";
import ProductCategories from "./ProductCategories"

const Filters = ({ ...props }) => {
    return (

        <div id="shop-filters" className="filters">
            <ProductCategories
                activeCategory={props.activeCategory}
                activeSubcategory={props.activeSubcategory}
                setCategory={props.setCategory}
                setSubcategory={props.setSubcategory}
                setSubcategoryName={props.setSubcategoryName}
                categories={props.filters.categories}
                resetPageNumber={props.resetPageNumber}
            />
            <FilterByPrice resetPageNumber={props.resetPageNumber} prices={props.filters.prices} setMinPrice={props.setMinPrice} setMaxPrice={props.setMaxPrice} />
            <FilterByColor resetPageNumber={props.resetPageNumber} colors={props.filters.colors} setColor={props.setColor} />
            <FilterBySize resetPageNumber={props.resetPageNumber} sizes={props.filters.sizes} setSize={props.setSize} />
        </div>
    )
}

export default Filters;