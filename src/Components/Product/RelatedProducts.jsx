import React from "react"
import "../../index.css"
import ProductPreview from "./ProductPreview"

const RelatedProducts = ({ ...props }) => {

    const listProducts = props.relatedProducts.map((product) =>
        <div id="single-product-related-single" className={props.viewClass}>
            <ProductPreview product={product} />
        </div>
    )

    return (
        <div id="single-product-related" className="feature-products">
            <h3>Related products</h3>
            <hr />
            <div id="single-product-related-list" className="feature-products-collections">
                {listProducts}
            </div>
        </div>
    );

}

export default RelatedProducts;