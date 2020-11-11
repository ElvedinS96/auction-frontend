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
        <div className={"filter-subcategories-text"} onClick={() => { props.setSubcategory(subcategory.id); props.resetPageNumber() }}>
            {subcategory.name} ({subcategory.count})
        </div>
    )

    function ListSubcategories(props) {
        if (activeCategory == props.category.id) {
            setSubcategories(props.category.subcategories)
            return <div className="filter-subcategories">{listSub}</div>
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
        <div className="each-filter-text">
            <div className="filter-category" onClick={() => onCategoryClick(category)}>
                {category.name}
                <GetIcon category={category} />
            </div>
            <div>
                <ListSubcategories category={category} />
            </div>
        </div >
    )

    function onCancelClick() {
        props.setCategory(0)
        props.setSubcategory(0)
    }

    return (
        <div className="filter-box">
            <div className="heading-filter">
                <h5>PRODUCT CATEGORIES</h5 >
                <div className="cancel" onClick={() => onCancelClick()}><BiX /></div>
            </div>

            <div>
                {listCategories}
            </div>
        </div>
    )
}

export default ProductCategories;