import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import "../../index.css"
import Bidding from "./Bidding";

const ProductDetails = ({ ...props }) => {

    const [price, setPrice] = useState(0)

    useEffect(() => {
        if (props.product.price != null) {
            setPrice(props.product.price.toFixed(2))
        }
    })

    return (
        <div id="single-product-right" className="product-right">
            <h2>{props.product.name}</h2>
            <h5>Start from - ${price}</h5>
            <Bidding
                bidValue={props.bidValue}
                baseUrl={props.baseUrl}
                productId={props.product.id}
                numberOfBids={props.numberOfBids}
                highestBid={props.highestBid}
                inputOnChange={props.inputOnChange}
                onClick={props.onClick}
            />
            <div className="product-details">
                <h6>Details</h6>
                <hr />
                <p>{props.product.description}</p>
            </div>

        </div>
    );
}

export default ProductDetails;