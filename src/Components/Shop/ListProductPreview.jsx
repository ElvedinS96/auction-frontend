import React from "react"
import { useHistory } from "react-router-dom";
import "../../index.css"
import { RiAuctionFill } from "react-icons/ri"

const ListProductPreview = ({ ...props }) => {

    const history = useHistory()

    return (
        <div className="product-preview-list">
            <div className="image-list">
                <img className="" src={props.product.imagesUrl[0]} alt="product" />
            </div>
            <div>
                <h4>{props.product.name}</h4>
                <p>{props.product.description}</p>
                <label>Start From ${props.product.price}.00</label>
                <div onClick={() => history.push("/product/" + props.product.id)} className="shop-bid-button">Bid <span style={{ color: "#ECECEC", "margin-left": "0.5em" }}> <RiAuctionFill /></span></div>
            </div>


        </div>
    );

}

export default ListProductPreview;