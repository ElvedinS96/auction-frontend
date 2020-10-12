import React from "react";
import "../../index.css"
import ProductPreview from "../Product/ProductPreview"

const LandingProducts = ({ ...props }) => {

    const listFeatures = props.products.map((product) =>
        <div className={props.viewClass}>
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
        <div className={props.listClass}>
            < h4 >{props.heading}</h4 >
            {getHr(props.hr)}
            <div className="feature-products-list">
                {listFeatures}
            </div>
        </div >

    )
}

export default LandingProducts;