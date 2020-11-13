import React from "react";
import { useState } from "react";
import Profile from "../../Components/UserProfile/Profile";
import UserBids from "../../Components/UserProfile/UserBids";
import Settings from "../../Components/UserProfile/Settings";
import UserProfileHeader from "../../Components/UserProfile/UserProfileHeader";
import "../../index.css"
import Header from "../HeaderFooter/Header";
import { useEffect } from "react";

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

    const [userBids, setUserBids] = useState([{
        id: 0,
        name: "",
        auctionEndDate: "",
        userBid: 0,
        highestBid: 0,
        numberOfBids: 0,
        imgUrl: ""
    }])


    useEffect(() => {
        //TODO Axios api call
        var bids = [{
            id: 10,
            name: "Black Jacket",
            auctionEndDate: "1605312000000",
            userBid: 50,
            highestBid: 100.25,
            numberOfBids: 3,
            imgUrl: "https://www.namepros.com/attachments/empty-png.89209/"
        },
        {
            id: 11,
            name: "Tablet",
            auctionEndDate: "1605484800000",
            userBid: 150,
            highestBid: 500.17,
            numberOfBids: 1,
            imgUrl: "https://www.namepros.com/attachments/empty-png.89209/"
        },
        {
            id: 5,
            name: "Shoes",
            auctionEndDate: "1606521600000",
            userBid: 230,
            highestBid: 230,
            numberOfBids: 1,
            imgUrl: "https://www.namepros.com/attachments/empty-png.89209/"
        }
        ]
        setUserBids(bids)

    }, [])

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
            return <UserBids bids={userBids} />
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