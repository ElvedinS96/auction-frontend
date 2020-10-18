import React from "react";
import "../../index.css"

const FeatureCollection = ({ ...props }) => {

    const listFeatures = props.collections.map((collection) =>
        <div className="landing-product">
            <div className="product-preview">
                <div>
                    <a href={"/products?category=" + collection.category.name + "&feature=true"}>
                        <img src={collection.category.imageUrl} alt="product" />
                    </a>
                </div>
                <h4>{collection.category.name + " Collection"}</h4>
                <label>Start from: ${collection.lowestPrice}.00</label>
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