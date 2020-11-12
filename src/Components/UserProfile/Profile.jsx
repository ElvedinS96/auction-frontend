import React from "react";
import "../../index.css"
import PersonalInfo from "./PersonalInfo"
import AdressInfo from "./AdressInfo";
import CardInfo from "./CardInfo";

const Profile = props => {

    return (
        <div>
            <PersonalInfo />
            <CardInfo />
            <AdressInfo />
        </div>
    )
}

export default Profile;