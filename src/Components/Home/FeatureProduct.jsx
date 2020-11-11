import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import "../../index.css"

const FeatureProduct = ({ ...props }) => {

    const [price, setPrice] = useState(0)

    useEffect(() => {
        if (props.product.price != null) {
            setPrice(parseFloat(props.product.price).toFixed(2))
        }
    })

    return (
        <div className="home-top-feature">
            <div className="home-top-product">
                <h2>{props.product.name}</h2>
                <h5>Start from - ${price}</h5>
                <p>{props.product.description}</p>
                <button type="btn" onClick={props.onClick}>BID NOW <span className="bid-arrow">&#10095;</span></button>
            </div>
            <div>
                <img src={props.product.image} alt="product" />
            </div>
        </div>
    );
}

export default FeatureProduct;