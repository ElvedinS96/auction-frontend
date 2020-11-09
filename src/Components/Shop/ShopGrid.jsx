import React from "react";
import "../../index.css"
import ShopHeader from "./ShopHeader";
import ShopProductPreview from "./ShopProductPreview";

const ShopGrid = ({ ...props }) => {

    const listProducts = props.products.map((product) =>
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
            <div className={props.exploreClass}>
                <button onClick={() => props.exploreMore()}>EXPLORE MORE</button>
            </div>

        </div>
    )
}

export default ShopGrid;