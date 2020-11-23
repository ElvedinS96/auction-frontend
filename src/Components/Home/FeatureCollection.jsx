import React from "react";
import "../../index.css"

const FeatureCollection = ({ ...props }) => {

    const listFeatures = props.collections.map((collection) =>
        <div id="home-feature-single-collection" className="landing-product">
            <div id="home-feature-collection-preview" className="product-preview">
                <div>
                    <a href={"/products?category=" + collection.category.id + "&feature=true"}>
                        <img src={collection.category.imageUrl} alt="product" />
                    </a>
                </div>
                <h4>{collection.category.name + " Collection"}</h4>
                <label>Start From: ${collection.lowestPrice}.00</label>
            </div>
        </div>
    )

    return (
        <div id="home-feature-collection-inside" className="feature-products">
            < h4 className="feature-products-heading" > Feature Collection</h4 >
            <hr></hr>
            <div className="feature-products-collections">
                {listFeatures}
            </div>
        </div >

    )
}

export default FeatureCollection;