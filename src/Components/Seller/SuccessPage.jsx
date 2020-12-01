import React from "react";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import "../../index.css"
import Header from "../../pages/HeaderFooter/Header";


const SuccessPage = props => {

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
            <div id="become-seller-wrapper" className="wrapper seller-wrapper">
                <div className="user-box seller-box">
                    <div className="profile-heading seller-heading">SUCCESSFULLY POSTED PRODUCT</div>
                    <div id="become-seller-content" className="become-seller-content">
                        <div className="selling-done-img">
                            <img src={localStorage.createdImage} />
                        </div>
                        <div className="become-seller-label">
                            <label>You successfully posted {localStorage.createdName} on auction .</label>
                        </div>
                        <div>
                            <button id="become-seller-btn-start" onClick={() => history.push("/product/" + localStorage.createdId)}>
                                SEE PRODUCT<span className="bid-arrow">&#10095;</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div >

    )
}

export default SuccessPage;