import React from "react";
import "../../index.css"
import ProductPreview from "../Product/ProductPreview"

const FeatureCollection = ({ ...props }) => {

    /*const listFeatures = props.products.map((product) =>
        <div className="related-product">
            <ProductPreview product={product} />
        </div>
    )*/

    return (
        <div className="feature-products">
            < h4 > Feature Collection</h4 >
            <hr></hr>

        </div >

    )
}

export default FeatureCollection;