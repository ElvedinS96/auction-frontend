import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import "../../index.css"
import GenericField from "../FormField/GenericField";
import axios from "axios"
import calculateTimeLeft from "../../Util/calculateTimeLeft";
import getUserFromToken from "../../Util/getUserFromToken";

const Bidding = ({ ...props }) => {

    const [highestBid, setHighestBid] = useState(0)
    const [numberOfBids, setNumberOfBids] = useState(0)
    const [auctionTime, setAuctionTime] = useState("Time left: ")
    const [time, setTime] = useState("")
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

                    var user = getUserFromToken()
                    if (user != null) {
                        var userBids = response.data.bids.filter(singleBid => singleBid.userId == user.id)
                        if (userBids.length > 0) {
                            var userHighest = Math.max.apply(Math, userBids.map(bid => bid.bidAmount))
                            if (userHighest < highestBid) {
                                localStorage.statusMessage = "There are higher bids than yours. You could give a second try!"
                                localStorage.statusClass = "status status-info"
                            }
                            else {
                                localStorage.statusMessage = "Congrats! You are the highest bidder!"
                                localStorage.statusClass = "status status-success"
                            }
                        }
                    }

                    var timeOfAuction = calculateTimeLeft(Date.now(), response.data.auctionEndDate)

                    if ((Date.now() - response.data.auctionEndDate) >= 0) {
                        setDisabled(true)
                    }
                    else if (Date.now() < response.data.auctionStartDate) {
                        console.log(response.data.auctionStartDate)
                        setDisabled(true)
                        setAuctionTime("Auction starts in: ")
                        timeOfAuction = calculateTimeLeft(Date.now(), response.data.auctionStartDate)
                    }
                    else {
                        setDisabled(false)
                        setAuctionTime("Time left: ")
                    }

                    setTime(timeOfAuction)
                })
                .catch(error => {
                    window.location.href = "/404"
                })

        }, 1000);
        return () => clearInterval(interval);
    }, [])

    return (
        <div id="single-product-bidding">
            <div className="bidding">
                <div className="bidding-field">
                    <GenericField id="single-product-input-bid" value={props.bidValue} type="number" className="bid-input" onChange={props.inputOnChange} disabled={disabled} />
                    <button id="single-product-btn-bid" className="basic-button" type="btn" onClick={props.onClick} disabled={disabled}>PLACE BID <span className="bid-arrow">&#10095;</span></button>
                </div>
                <label>Enter ${(parseFloat(highestBid) + 1).toFixed(2)} or more</label>
            </div>
            <div className="bidding-info">
                <div id="single-product-highest">Highest bid: <p>${highestBid.toFixed(2)}</p></div>
                <div id="single-product-number-buds">No bids: {numberOfBids}</div>
                <div>{auctionTime}{time}</div>
            </div>
        </div>
    );
}

export default Bidding;