import React from "react";
import "../../index.css"
import calculateTimeUserBids from "../../Util/calculateTimeUserBids";

const UserBids = props => {

    function UserPrice(userBid, highestBid) {
        if (userBid < highestBid) {
            return <td><div className="user-bids-center">$ {userBid.toFixed(2)}</div></td>
        }
        return <td><div style={{ color: "#6CC047" }} className="user-bids-center">$ {userBid.toFixed(2)}</div></td>
    }

    function HighestBid(userBid, highestBid) {
        if (userBid < highestBid) {
            return <td><div style={{ color: "#5B9ED6 " }} className="user-bids-center">$ {highestBid.toFixed(2)}</div></td>
        }
        return <td><div style={{ color: "#6CC047 " }} className="user-bids-center">$ {highestBid.toFixed(2)}</div></td>
    }

    function TimeLeft(endTime) {
        var timeOfAuction = calculateTimeUserBids(Date.now(), endTime)
        return timeOfAuction
    }

    const listBids = props.bids.map((bid) =>
        <tr>
            <td><img src={bid.imgUrl} /></td>
            <td colSpan={2}>
                <div style={{ fontWeight: "bold" }}>{bid.name}</div>
                <div style={{ color: "#8367D8" }}>#{bid.productId}</div>
            </td>
            <td>{TimeLeft(bid.auctionEndDate)}</td>
            {UserPrice(bid.userBid, bid.highestBid)}
            <td><div className="user-bids-center">{bid.numberOfBids}</div></td>
            {HighestBid(bid.userBid, bid.highestBid)}
            <td>
                <td><div onClick={() => window.location.href = "/product/" + bid.productId} className="user-bids-center user-bid-view">VIEW</div></td>
            </td>
        </tr>
    )

    function Biddings() {
        if (props.bids.length == 0) {
            return <tr className="bider-row"><td colSpan={4} className="bider-name">You don't have bids yet</td></tr>
        }
        else {
            return listBids
        }
    }



    return (
        <div>
            <div className="user-bids">
                <table cellspacing="0">
                    <tr className="user-bids-heading">
                        <td className="user-bids-item">Item</td>
                        <td colSpan={2}>Name</td>
                        <td>Time left</td>
                        <td><div className="user-bids-center">Your Price</div></td>
                        <td><div className="user-bids-center">No.Bids</div></td>
                        <td><div className="user-bids-center">Highest Bid</div></td>
                        <td><div className="user-bids-center"></div></td>
                    </tr>
                    {Biddings()}
                </table>
            </div>
        </div>
    )
}

export default UserBids;