import React from "react";
import { useEffect } from "react";
import "../../index.css"

const FeatureProduct = ({ ...props }) => {

    return (
        <div className="home-top-feature">
            <div className="home-top-product">
                <h2>{props.product.name}</h2>
                <h5>Start from - ${props.product.price}.00</h5>
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