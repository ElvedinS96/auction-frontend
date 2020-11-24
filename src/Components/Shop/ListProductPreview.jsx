import React from "react"
import { useHistory } from "react-router-dom";
import "../../index.css"
import { RiAuctionFill } from "react-icons/ri"
import { useState } from "react";
import { useEffect } from "react";

const ListProductPreview = ({ ...props }) => {

    const history = useHistory()
    const [price, setPrice] = useState(0)

    useEffect(() => {
        if (props.product.price != null) {
            setPrice(props.product.price.toFixed(2))
        }
    })

    return (
        <div id="shop-list-preview" className="product-preview-list">
            <div className="image-list">
                <img className="" src={props.product.imagesUrl[0]} alt="product" />
            </div>
            <div>
                <h4>{props.product.name}</h4>
                <p>{props.product.description}</p>
                <label>Start From ${price}</label>
                <div id="shop-list-btn-bid" onClick={() => history.push("/product/" + props.product.id)} className="shop-bid-button">Bid <span style={{ color: "#ECECEC", "margin-left": "0.5em" }}> <RiAuctionFill /></span></div>
            </div>


        </div>
    );

}

export default ListProductPreview;