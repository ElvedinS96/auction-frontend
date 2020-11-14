import React from "react";
import "../../index.css"
import PersonalInfo from "./PersonalInfo"
import AdressInfo from "./AdressInfo";
import CardInfo from "./CardInfo";

const Profile = props => {

    return (
        <div>
            <PersonalInfo
                genderOptions={props.genderOptions}

                monthOptions={props.monthOptions}
                yearOptions={props.yearOptions}
                dayOptions={props.dayOptions}

                onChange={props.onChange}
                userInfo={props.userInfo}

            />
            <CardInfo
                monthOptions={props.monthOptions}
                yearOptions={props.yearOptions}

                onChange={props.onChange}
                userInfo={props.userInfo}
            />
            <AdressInfo
                onChange={props.onChange}
                userInfo={props.userInfo}
            />

            <button>SAVE INFO</button>
        </div>
    )
}

export default Profile;