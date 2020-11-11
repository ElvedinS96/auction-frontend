import React from "react"
import "../../index.css"
import { RiAuctionFill } from "react-icons/ri"
import { useHistory } from "react-router-dom"
import { useState } from "react"
import { useEffect } from "react"

const ShopProductPreview = ({ ...props }) => {

    const history = useHistory()
    const [price, setPrice] = useState(0)

    useEffect(() => {
        if (props.product.price != null) {
            setPrice(props.product.price.toFixed(2))
        }
    })

    return (

        <div className="product-preview">
            <div className="container">
                <img src={props.product.imagesUrl[0]} alt="product" className="image" />
                <div className="overlay">
                    <div onClick={() => history.push("/product/" + props.product.id)} className="text">Bid <RiAuctionFill /></div>
                </div>
            </div>
            <h4>{props.product.name}</h4>
            <label>Start from: ${price}</label>
        </div>

    );

}

export default ShopProductPreview;