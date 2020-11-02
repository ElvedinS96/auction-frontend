import React from "react";
import { useState } from "react";
import "../../index.css"
import ShopHeader from "./ShopHeader";
import ShopProductPreview from "./ShopProductPreview";

const ShopGrid = ({ ...props }) => {

    const products = [{ id: 1, imagesUrl: ["https://www.tate.org.uk/art/images/work/L/L01/L01682_10.jpg"], name: "Product name", price: 100 },
    { id: 1, imagesUrl: ["https://www.tate.org.uk/art/images/work/L/L01/L01682_10.jpg"], name: "Product name", price: 100 },
    { id: 1, imagesUrl: ["https://www.tate.org.uk/art/images/work/L/L01/L01682_10.jpg"], name: "Product name", price: 100 },
    { id: 1, imagesUrl: ["https://www.tate.org.uk/art/images/work/L/L01/L01682_10.jpg"], name: "Product name", price: 100 },
    { id: 1, imagesUrl: ["https://www.tate.org.uk/art/images/work/L/L01/L01682_10.jpg"], name: "Product name", price: 100 },
    { id: 1, imagesUrl: ["https://www.tate.org.uk/art/images/work/L/L01/L01682_10.jpg"], name: "Product name", price: 100 },
    { id: 1, imagesUrl: ["https://www.tate.org.uk/art/images/work/L/L01/L01682_10.jpg"], name: "Product name", price: 100 }]

    const listProducts = products.map((product) =>
        <div className="shop-grid-product">
            <ShopProductPreview product={product} />
        </div>
    )

    return (
        <div className="shop-products">
            <ShopHeader dropValue={props.dropValue} handleDropdown={props.handleDropdown} onClick={props.onClick} gridClass={props.gridClass} listClass={props.listClass} />
            <div className="shop-page-grid">
                {listProducts}
            </div>
        </div>
    )
}

export default ShopGrid;