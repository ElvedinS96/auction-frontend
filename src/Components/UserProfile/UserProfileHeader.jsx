import React from "react";
import "../../index.css"
import { FaUser } from "react-icons/fa"
import { ImHammer2 } from "react-icons/im";
import { RiSettings5Fill } from "react-icons/ri";

const UserProfileHeader = props => {

    return (
        <div className="profile-header">
            <span
                className={"nav-profile-button " + props.classes.profile}
                onClick={() => props.setActive("profile")} >
                <FaUser className="profile-header-icon" /> <label>Profile</label>
            </span>
            <span
                className={"nav-profile-button " + props.classes.bids}
                onClick={() => props.setActive("bids")} >
                <ImHammer2 className="profile-header-icon" /> <label>Bids</label>
            </span>
            <span
                className={"nav-profile-button " + props.classes.settings}
                onClick={() => props.setActive("settings")} >
                <RiSettings5Fill className="profile-header-icon" /> <label>Settings</label>
            </span>
        </div>
    )
}

export default UserProfileHeader;