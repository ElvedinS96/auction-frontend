import React from "react"
import { useEffect } from "react";
import { useState } from "react";
import "../../index.css"

const ProductPreview = ({ ...props }) => {

    const [price, setPrice] = useState(0)

    useEffect(() => {
        if (props.product.price != null) {
            setPrice(props.product.price.toFixed(2))
        }
    })

    return (
        <div className="product-preview">
            <div>
                <a href={"/product/" + props.product.id}><img src={props.product.imagesUrl[0]} alt="product" /></a>
            </div>
            <h4>{props.product.name}</h4>
            <label>Start from: ${price}</label>
        </div>
    );

}

export default ProductPreview;