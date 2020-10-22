import React from "react"

const BiddingTable = ({ ...props }) => {

    var bidders = [{
        url: "https://cactusthemes.com/blog/wp-content/uploads/2018/01/tt_avatar_small.jpg",
        name: "John Doe",
        date: "29.12.2020",
        bid: 100
    },
    {
        url: "https://www.shareicon.net/data/512x512/2016/07/26/802031_user_512x512.png",
        name: "Jane Doe",
        date: "29.12.2020",
        bid: 100
    },
    {
        url: "https://cactusthemes.com/blog/wp-content/uploads/2018/01/tt_avatar_small.jpg",
        name: "John Doe",
        date: "29.12.2020",
        bid: 100
    }
    ]

    const listBidders = bidders.map((bidder) =>
        <tr className="bider-row">
            <td className="bider-name-img"><img src={bidder.url} /></td>
            <td className="bider-name-text">{bidder.name}</td>
            <td>{bidder.date}</td>
            <td className="bider-name-text">${bidder.bid}.00</td>
        </tr>
    )

    return (
        <div className="related-products">
            <table cellspacing="0">
                <tr className="heading-row">
                    <th colSpan={2} className="bider-name">Bider</th>
                    <th>Date</th>
                    <th>Bid</th>
                </tr>
                {listBidders}
            </table>
        </div>
    )
}

export default BiddingTable;