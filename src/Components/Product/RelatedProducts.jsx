import React from "react"
import "../../index.css"
import ProductPreview from "./ProductPreview"

const RelatedProducts = ({ ...props }) => {

    const listProducts = props.relatedProducts.map((product) =>
        <div className={props.viewClass}>
            <ProductPreview product={product} />
        </div>
    )

    return (
        <div className="feature-products">
            <h3>Related products</h3>
            <hr />
            <div className="feature-products-collections">
                {listProducts}
            </div>
        </div>
    );

}

export default RelatedProducts;