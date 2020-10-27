import React from "react";
import "../../index.css"
import Bidding from "./Bidding";

const ProductDetails = ({ ...props }) => {

    return (
        <div className="product-right">
            <h2>{props.product.name}</h2>
            <h5>Start from - ${props.product.price}</h5>
            <Bidding baseUrl={props.baseUrl} productId={props.product.id} numberOfBids={props.numberOfBids} highestBid={props.highestBid} inputOnChange={props.inputOnChange} onClick={props.onClick} />
            <div className="product-details">
                <h6>Details</h6>
                <hr />
                <p>{props.product.description}</p>
            </div>

        </div>
    );
}

export default ProductDetails;