import React from "react";
import "../../index.css"

const Category = ({ ...props }) => {

    const listCategories = props.categories.map((category) =>
        <div id="home-top-category" >
            <div className="category-item"><a href={"/products?category=" + category.id + "&feature=false"}>{category.name}</a></div>
            <hr className="line"></hr>
        </div>

    )

    return (
        <div id="home-top-categories" className="home-category">
            <h5>CATEGORIES</h5>
            <div>
                {listCategories}
            </div>
        </div>
    );
}

export default Category;