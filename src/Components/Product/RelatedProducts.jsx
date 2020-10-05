import React, { useEffect, useState } from "react";
import "../../index.css"
import ProductPreview from "./ProductPreview"

const RelatedProducts = ({ ...props }) => {

    const listProducts = props.relatedProducts.map((product) =>
        <div className="related-product">
            <ProductPreview product={product} />
        </div>
    )

    return (
        <div className="related-products">
            <h3>Related products</h3>
            <hr />
            <div>
                {listProducts}
            </div>
        </div>
    );

}

export default RelatedProducts;