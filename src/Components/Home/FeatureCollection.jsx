import React from "react";
import "../../index.css"

const FeatureCollection = ({ ...props }) => {

    const listFeatures = props.products.map((product) =>
        <div className="landing-product">
            <div className="product-preview">
                <div>
                    <img src={product[0].imagesUrl[0]} alt="product" />
                </div>
                <h4>{product[0].name}</h4>
                <label>Start from: ${product[0].price}</label>
            </div>
        </div>
    )

    return (
        <div className="feature-products">
            < h4 > Feature Collection</h4 >
            <hr></hr>
            <div className="feature-products-collections">
                {listFeatures}
            </div>
        </div >

    )
}

export default FeatureCollection;