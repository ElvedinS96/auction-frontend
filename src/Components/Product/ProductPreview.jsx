import React from "react"
import "../../index.css"

const ProductPreview = ({ ...props }) => {

    return (
        <div className="product-preview">
            <div>
                <a href={"/product/" + props.product.id}><img src={props.product.imagesUrl[0]} alt="product" /></a>
            </div>
            <h4>{props.product.name}</h4>
            <label>Start from: ${props.product.price}</label>
        </div>
    );

}

export default ProductPreview;