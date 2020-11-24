import React from "react";
import "../../index.css"
import ProductPreview from "../Product/ProductPreview"

const LandingProducts = ({ ...props }) => {

    const listFeatures = props.products.map((product) =>
        <div id="home-feature-products-single" className={props.viewClass}>
            <ProductPreview product={product} />
        </div>
    )

    function getHr(hr) {
        if (hr) {
            return (
                <hr></hr>
            )
        }
    }

    return (
        <div id="home-feature-products" className={props.listClass}>
            < h4 className="feature-products-heading" >{props.heading}</h4 >
            {getHr(props.hr)}
            <div id="feature-products-list" className="feature-products-list">
                {listFeatures}
            </div>
        </div >

    )
}

export default LandingProducts;