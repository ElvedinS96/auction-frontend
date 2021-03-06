import React from "react"
import { useState } from "react"
import { useEffect } from "react"
import axios from "axios"
import showDate from "../../Util/showDate"

const BiddingTable = ({ ...props }) => {

    const [bidders, setBidders] = useState([])
    const [highestBid, setHighestBid] = useState(0)

    useEffect(() => {
        const interval = setInterval(() => {

            const url = props.baseUrl + "/product/" + localStorage.productId
            axios.get(url)
                .then(response => {
                    setBidders(response.data.bids)
                    setHighestBid(props.highestBid)
                })
                .catch(error => {
                    console.log(error)
                    alert(error)
                    window.location.href = "/404"
                })

        }, 1000);
        return () => clearInterval(interval);
    })

    const listBidders = bidders.map((bidder) =>
        <tr className="bider-row">
            <td className="bider-name-img"><img src={bidder.userImage} /></td>
            <td className="bider-name-text">{bidder.userName}</td>
            <td>{showDate(bidder.bidTime)}</td>
            <td className={bidder.bidAmount === highestBid ? "bider-name-text-highest" : "bider-name-text"}>$ {parseFloat(bidder.bidAmount).toFixed(2)}</td>
        </tr>
    )

    function Biddings() {
        if (props.bidders.length == 0) {
            return <tr className="bider-row"><td colSpan={4} className="bider-name">No one has bid yet</td></tr>
        }
        else {
            return listBidders
        }
    }

    return (
        <div id="single-product-table" className="product-bidding-table">
            <table cellspacing="0">
                <tr className="heading-row">
                    <td colSpan={2} className="bider-name">Bidder</td>
                    <td>Date</td>
                    <td>Bid</td>
                </tr>
                {<Biddings />}
            </table>
        </div>
    )
}

export default BiddingTable;