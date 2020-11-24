import React from "react";
import "../../../index.css"
import { BiPlusMedical, BiX } from 'react-icons/bi';
import { ImMinus } from 'react-icons/im'
import { useState } from "react";

const ProductCategories = ({ activeCategory, activeSubcategory, ...props }) => {

    const [subcategories, setSubcategories] = useState([])

    function GetIcon(props) {
        if (activeCategory == props.category.id) {
            return <ImMinus color={"#8367D8"} />
        }
        else {
            return <BiPlusMedical />
        }
    }

    const listSub = subcategories.map((subcategory) =>
        <div key={subcategory.id} id="shop-filter-sub-single" className={"filter-subcategories-text"} onClick={() => { props.setSubcategory(subcategory.id); props.setSubcategoryName(subcategory.name); props.resetPageNumber() }}>
            {subcategory.name} ({subcategory.count})
        </div>
    )

    function ListSubcategories(props) {
        if (activeCategory == props.category.id) {
            setSubcategories(props.category.subcategories)
            return <div id="shop-filter-sub-list-inside" className="filter-subcategories">{listSub}</div>
        }
        return <div></div>
    }

    function onCategoryClick(category) {
        if (activeCategory == category.id) {
            props.setCategory(0)
        }
        else {
            props.setCategory(category.id)
        }
    }

    const listCategories = props.categories.map((category) =>
        <div id="shop-filter-cat-single" className="each-filter-text">
            <div id="shop-filter-cat-single-cat" className="filter-category" onClick={() => onCategoryClick(category)}>
                {category.name}
                <GetIcon category={category} />
            </div>
            <div id="shop-filter-sub-list">
                <ListSubcategories category={category} />
            </div>
        </div >
    )

    function onCancelClick() {
        props.setCategory(0)
        props.setSubcategory(0)
        props.setSubcategoryName("")
    }

    return (
        <div id="shop-filters-categories" className="filter-box">
            <div id="shop-filters-categories-heading" className="heading-filter">
                <h5>PRODUCT CATEGORIES</h5 >
                <div className="cancel" onClick={() => onCancelClick()}><BiX /></div>
            </div>

            <div id="shop-filters-categories-list">
                {listCategories}
            </div>
        </div>
    )
}

export default ProductCategories;