import React from "react";
import "../../index.css"
import ListProductPreview from "./ListProductPreview";
import ShopHeader from "./ShopHeader";

const ShopList = ({ ...props }) => {

    const listProducts = props.products.map((product) =>
        <div className="shop-grid-product">
            <ListProductPreview product={product} />
        </div>
    )

    return (
        <div className="shop-products">
            <ShopHeader dropValue={props.dropValue} handleDropdown={props.handleDropdown} onClick={props.onClick} gridClass={props.gridClass} listClass={props.listClass} />
            {listProducts}
            <div className={props.exploreClass}>
                <button onClick={() => props.exploreMore()}>EXPLORE MORE</button>
            </div>
        </div>
    )
}

export default ShopList;