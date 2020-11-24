import React from "react";
import { useState } from "react";
import "../../index.css"
import Header from "../HeaderFooter/Header";
import PageName from "../HeaderFooter/PageName"
import { HiOutlineShoppingBag } from "react-icons/hi"
import { useHistory } from "react-router-dom";

const BecomeSeller = props => {

    const history = useHistory()

    const [active, setActive] = useState({
        home: "nav-inactive",
        shop: "nav-inactive",
        account: "nav-active"
    })
    const [activeAccount, setActiveAccount] = useState({
        profile: "",
        seller: "my-account-active",
        bids: "",
        settings: ""
    })

    return (
        <div>
            <Header active={active} accountActive={activeAccount} />
            <PageName pageName="BECOME SELLER" pageNav={<div>MY ACCOUNT /<span style={{ color: "#252525", marginLeft: '1em' }}>BECOME SELLER</span></div>} />
            <div id="become-seller-wrapper" className="wrapper seller-wrapper">
                <div className="user-box seller-box">
                    <div className="profile-heading seller-heading">SELL</div>
                    <div id="become-seller-content" className="become-seller-content">
                        <div>
                            <HiOutlineShoppingBag size={200} style={{ color: "#8367D8", marginTop: "2em" }} />
                        </div>
                        <div>
                            <label>You do not have any scheduled items for sale.</label>
                        </div>
                        <div>
                            <button id="become-seller-btn-start" onClick={(e) => history.push("/selling")}>
                                START SELLING<span className="bid-arrow">&#10095;</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div >

    )
}

export default BecomeSeller;