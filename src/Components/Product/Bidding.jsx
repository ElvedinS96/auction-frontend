import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import "../../index.css"
import GenericField from "../FormField/GenericField";
import axios from "axios"
import calculateTimeLeft from "../../Util/calculateTimeLeft";

const Bidding = ({ ...props }) => {

    const [highestBid, setHighestBid] = useState(0)
    const [numberOfBids, setNumberOfBids] = useState(0)
    const [timeLeft, setTimeLeft] = useState("")
    const [disabled, setDisabled] = useState(false)

    useEffect(() => {
        const interval = setInterval(() => {
            const url = props.baseUrl + "/product/" + localStorage.productId
            axios.get(url)
                .then(response => {
                    var highestBid = response.data.price
                    if (response.data.bids.length != 0) {
                        highestBid = Math.max.apply(Math, response.data.bids.map(bid => bid.bidAmount))
                    }
                    setHighestBid(highestBid)
                    setNumberOfBids(response.data.bids.length)
                    if (localStorage.userBid < highestBid) {
                        localStorage.statusMessage = "There are higher bids than yours. You could give a second try!"
                        localStorage.statusClass = "status status-info"
                    }
                    if ((Date.now() - response.data.auctionEndDate) >= 0) {
                        setDisabled(true)
                    }
                    setTimeLeft(calculateTimeLeft(Date.now(), response.data.auctionEndDate))
                })
                .catch(error => {
                    alert(error)
                    window.location.href = "/404"
                })

        }, 1000);
        return () => clearInterval(interval);
    }, [])

    return (
        <div>
            <div className="bidding">
                <div className="bidding-field">
                    <GenericField type="number" className="bid-input" onChange={props.inputOnChange} disabled={disabled} />
                    <button type="btn" onClick={props.onClick} disabled={disabled}>PLACE BID <span className="bid-arrow">&#10095;</span></button>
                </div>
                <label>Enter ${highestBid + 1}.00 or more</label>
            </div>
            <div className="bidding-info">
                <div>Highest bid: <p>${highestBid}.00</p></div>
                <div>No bids: {numberOfBids}</div>
                <div>Time left: {timeLeft}</div>
            </div>
        </div>
    );
}

export default Bidding;