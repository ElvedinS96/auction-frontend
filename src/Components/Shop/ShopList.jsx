import React from "react";
import "../../index.css"
import ListProductPreview from "./ListProductPreview";
import ShopHeader from "./ShopHeader";

const ShopList = ({ ...props }) => {

    const listProducts = props.products.map((product) =>
        <div id="shop-list-single" className="shop-grid-product">
            <ListProductPreview product={product} />
        </div>
    )

    return (
        <div id="shop-list-products" className="shop-products">
            <ShopHeader dropValue={props.dropValue} handleDropdown={props.handleDropdown} onClick={props.onClick} gridClass={props.gridClass} listClass={props.listClass} />
            {listProducts}
            <div className="shop-buttons">
                <div className={props.exploreClass}>
                    <button id="shop-list-btn-explore" onClick={() => props.exploreMore()}>EXPLORE MORE</button>
                </div>
                <div className="explore-more">
                    <button id="shop-list-btn-top" onClick={() => window.scrollTo({ top: 0, left: 0, behavior: "smooth" })}>GO TO TOP</button>
                </div>
            </div>
        </div>
    )
}

export default ShopList;