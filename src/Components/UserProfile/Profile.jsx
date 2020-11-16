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
                changeImage={props.changeImage}
                validation={props.validation}

            />
            <CardInfo
                monthOptions={props.monthOptions}
                yearOptions={props.yearOptions}

                onChange={props.onChange}
                userInfo={props.userInfo}
                validation={props.validation}
            />
            <AdressInfo
                onChange={props.onChange}
                userInfo={props.userInfo}
                validation={props.validation}
                countryOptions={props.countryOptions}
                onCountryChange={props.onCountryChange}
                cityOptions={props.cityOptions}
            />
            <div className="save-info-button">
                <button onClick={(e) => props.saveInfo()}>SAVE INFO <span className="bid-arrow">&#10095;</span></button>
            </div>
        </div>
    )
}

export default Profile;