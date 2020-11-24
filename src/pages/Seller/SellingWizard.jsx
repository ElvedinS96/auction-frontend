import React from "react";
import { useState } from "react";
import "../../index.css"
import Header from "../HeaderFooter/Header";
import PageName from "../HeaderFooter/PageName"

const SellingWizard = props => {

    const [active, setActive] = useState({
        home: "nav-inactive",
        shop: "nav-inactive",
        account: "nav-active"
    })

    return (
        <div>
            <Header active={active} />
            <PageName pageName="SELLING WIZARD" pageNav={<div>MY ACCOUNT /<span style={{ color: "#252525", marginLeft: '1em' }}>SELLING</span></div>} />
            <div id="wizard-wrapper" className="wrapper wizard-wrapper">
                <div className="user-box wizard-box">
                    Seller wizzard
                </div>
            </div>
        </div >

    )
}

export default SellingWizard;