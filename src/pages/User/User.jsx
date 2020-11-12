import React from "react";
import { useState } from "react";
import Profile from "../../Components/UserProfile/Profile";
import UserBids from "../../Components/UserProfile/UserBids";
import Settings from "../../Components/UserProfile/Settings";
import UserProfileHeader from "../../Components/UserProfile/UserProfileHeader";
import "../../index.css"
import Header from "../HeaderFooter/Header";

const User = props => {

    const [active, setActive] = useState({
        home: "nav-inactive",
        shop: "nav-inactive",
        account: "nav-active"
    })

    const headerActiveClass = "nav-profile-button-active"
    const [profileHeaderActive, setProfileHeaderActive] = useState("profile")
    const [headerClasses, setHeaderClasses] = useState({
        profile: headerActiveClass,
        bids: "",
        settings: ""
    })

    function onHeaderClick(activeButton) {
        switch (activeButton) {
            case "profile":
                setProfileHeaderActive("profile")
                setHeaderClasses({ profile: headerActiveClass, bids: "", settings: "" })
                break;
            case "bids":
                setProfileHeaderActive("bids")
                setHeaderClasses({ profile: "", bids: headerActiveClass, settings: "" })
                break;
            case "settings":
                setProfileHeaderActive("settings")
                setHeaderClasses({ profile: "", bids: "", settings: headerActiveClass })
                break;
        }
    }

    function SetSection() {
        if (profileHeaderActive == "profile") {
            return <Profile />
        }
        else if (profileHeaderActive == "bids") {
            return <UserBids />
        }
        else if (profileHeaderActive == "settings") {
            return <Settings />
        }
        return <div></div>
    }


    return (
        <div>
            <Header active={active} />
            <div className="wrapper">
                <UserProfileHeader setActive={onHeaderClick} classes={headerClasses} />
                <SetSection />
            </div>
        </div>
    )
}

export default User;