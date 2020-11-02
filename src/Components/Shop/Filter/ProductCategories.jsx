import React from "react";
import "../../../index.css"
import { BiPlusMedical } from 'react-icons/bi';
import { ImMinus } from 'react-icons/im'
import { useState } from "react";

const ProductCategories = ({ ...props }) => {

    const categories = ["Fashion", "Accesories", "Shoes", "Home", "Arts", "Computers"]
    const subcategories = ["Jacket", "Shirt", "T-Shirt", "Jeans", "Pants"]

    const [activeCategory, setActiveCategory] = useState("")
    const [activeSubcategory, setActiveSubcategory] = useState("")

    function GetIcon(props) {
        if (activeCategory == props.category) {
            return <ImMinus color={"#8367D8"} />
        }
        else {
            return <BiPlusMedical />
        }
    }

    const listSub = subcategories.map((subcategory) =>
        <div className={"filter-subcategories-text"} onClick={() => setActiveSubcategory(subcategory)}>
            {subcategory} (250)
        </div>
    )

    function ListSubcategories(props) {
        if (activeCategory == props.category) {
            return <div className="filter-subcategories">{listSub}</div>
        }
        return <div></div>
    }

    function onCategoryClick(category) {
        if (activeCategory == category) {
            setActiveCategory("")
        }
        else {
            setActiveCategory(category)
        }
    }

    const listCategories = categories.map((category) =>
        <div className="each-filter-text">
            <div className="filter-category" onClick={() => onCategoryClick(category)}>
                {category}
                <GetIcon category={category} />
            </div>
            <div>
                <ListSubcategories category={category} />
            </div>
        </div >
    )

    return (
        <div className="filter-box">
            <h5>PRODUCT CATEGORIES</h5>
            <div>
                {listCategories}
            </div>
        </div>
    )
}

export default ProductCategories;