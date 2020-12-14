import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import "../../index.css"
import calculateTimeUserBids from "../../Util/calculateTimeUserBids";
import { BiAddToQueue } from "react-icons/bi"

const Seller = props => {

    const history = useHistory()
    const [active, setActive] = useState(true)

    function FormatDate(date) {
        return date.toLocaleString('en-us', { month: "short" }) + ' ' + date.getDate() + ' ' + date.getFullYear()
    }

    function ListProducts(products) {
        return products.map((product) =>
            <tr>
                <td><img src={product.imgUrl} /></td>
                <td colSpan={2}>
                    <div style={{ fontWeight: "bold" }}>{product.name}</div>
                    <div style={{ color: "#8367D8" }}>#{product.productId}</div>
                </td>
                <td>{active ? calculateTimeUserBids(Date.now(), product.auctionEndDate) : FormatDate(new Date(product.auctionEndDate))}</td>
                <td><div className="user-bids-center">$ {product.userBid.toFixed(2)}</div></td>
                <td><div className="user-bids-center">{product.numberOfBids}</div></td>
                <td><div className="user-bids-center">{product.highestBid != 0 ? "$ " + product.highestBid.toFixed(2) : "no bids"}</div></td>
                <td>
                    <td><div onClick={() => window.location.href = "/product/" + product.productId} className="user-bids-center user-bid-view">VIEW</div></td>
                </td>
            </tr>
        )
    }

    function Biddings() {
        if (active && props.activeProducts.length == 0) {
            return <tr className="bider-row"><td colSpan={4} className="bider-name">You don't have active products</td></tr>
        }
        else if (active) {
            return ListProducts(props.activeProducts)
        }
        if (!active && props.soldProducts.length == 0) {
            return <tr className="bider-row"><td colSpan={4} className="bider-name">You don't have sold products</td></tr>
        }
        else if (!active) {
            return ListProducts(props.soldProducts)
        }
    }

    return (
        <div id="profile-seller" className="user-bids" >
            <div id="profile-seller-header" className="profile-seller-header">
                <div className="profile-seller-header-left">
                    <div onClick={() => setActive(true)}
                        className={active ? "profile-seller-header-button profile-seller-header-button-active" : "profile-seller-header-button"}>
                        Active
                    </div>
                    <div onClick={() => setActive(false)}
                        className={!active ? "profile-seller-header-button profile-seller-header-button-active" : "profile-seller-header-button"}>
                        Sold
                    </div>
                </div>
                <div onClick={() => history.push("/selling")} className="profile-seller-header-button profile-seller-header-button-active" >
                    <BiAddToQueue style={{ color: "#FFFFFF", marginRight: "0.5em" }} /> Sell New
                </div>
            </div>
            <table cellspacing="0">
                <tr className="user-bids-heading">
                    <td className="user-bids-item">Item</td>
                    <td colSpan={2}>Name</td>
                    <td>{active ? "Time left" : "Time ended"}</td>
                    <td><div className="user-bids-center">Your Price</div></td>
                    <td><div className="user-bids-center">No.Bids</div></td>
                    <td><div className="user-bids-center">Highest Bid</div></td>
                    <td><div className="user-bids-center"></div></td>
                </tr>
                {Biddings()}
            </table>
        </div >
    )
}

export default Seller;