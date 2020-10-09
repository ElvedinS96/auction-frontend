import React from "react";
import "../../index.css"
import ProductPreview from "../Product/ProductPreview"

const FeatureProducts = ({ ...props }) => {

    const listFeatures = props.products.map((product) =>
        <div className="related-product">
            <ProductPreview product={product} />
        </div>
    )

    return (
        <div className="feature-products">
            < h4 > Feature Products</h4 >
            <hr></hr>
            <div className="feature-products-list">
                {listFeatures}
            </div>
        </div >

    )
}

export default FeatureProducts;