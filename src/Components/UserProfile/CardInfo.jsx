import React from "react";
import "../../index.css"
import CardInfoContent from "./CardInfoContent";

const CardInfo = props => {

    return (
        <div id="user-page-card-info" ref={props.cardInfoRef} className="user-box profile-box">
            <div className="profile-heading">CARD INFORMATION</div>
            <div className="profile">
                <div className="profile-image"></div>
                <div className="profile-info">
                    <CardInfoContent
                        monthOptions={props.monthOptions}
                        yearOptions={props.yearOptions}
                        wrapperClass=""
                        onChange={props.onChange}
                        userInfo={props.userInfo}
                        validation={props.validation}
                    />
                </div>
            </div>
        </div>
    )
}

export default CardInfo;