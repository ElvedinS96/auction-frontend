import React from "react";
import "../../index.css"
import GenericField from "../FormField/GenericField";

const ProductDetails = ({ ...props }) => {

    return (
        <div className="product-right">
            <h2>{props.product.name}</h2>
            <h5>Start from - ${props.product.price}</h5>
            <div className="bidding">
                <div className="bidding-field">
                    <GenericField type="text" className="bid-input" />
                    <button type="btn">PLACE BID</button>
                </div>
                <label>Enter $260.00 or more</label>
            </div>
            <div className="bidding-info">
                <div>Highest bid: <p>$260.00</p></div>
                <div>No bids: 2</div>
                <div>Auction ends: {props.product.endDate}</div>
            </div>
            <div className="product-details">
                <h6>Details</h6>
                <hr />
                <p>{props.product.description}</p>
            </div>

        </div>
    );
}

export default ProductDetails;