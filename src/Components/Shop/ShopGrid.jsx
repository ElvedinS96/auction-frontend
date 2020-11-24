import React from "react";
import "../../index.css"
import ShopHeader from "./ShopHeader";
import ShopProductPreview from "./ShopProductPreview";

const ShopGrid = ({ ...props }) => {

    const listProducts = props.products.map((product) =>
        <div id="shop-grid-products-single" className="shop-grid-product">
            <ShopProductPreview product={product} />
        </div>
    )

    return (
        <div id="shop-right-page" className="shop-products">
            <ShopHeader dropValue={props.dropValue} handleDropdown={props.handleDropdown} onClick={props.onClick} gridClass={props.gridClass} listClass={props.listClass} />
            <div id="shop-grid-products" className="shop-page-grid">
                {listProducts}
            </div>
            <div className="shop-buttons">
                <div className={props.exploreClass}>
                    <button id="shop-grid-btn-explore" onClick={() => props.exploreMore()}>EXPLORE MORE</button>
                </div>
                <div className="explore-more">
                    <button id="shop-grid-btn-top" onClick={() => window.scrollTo({ top: 0, left: 0, behavior: "smooth" })}>GO TO TOP</button>
                </div>
            </div>
        </div>
    )
}

export default ShopGrid;