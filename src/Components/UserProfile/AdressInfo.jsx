import React from "react";
import "../../index.css"
import GenericField from "../FormField/GenericField";

const AdressInfo = props => {

    return (
        <div className="user-box profile-box">
            <div className="profile-heading">OPTIONAL</div>
            <div className="profile">
                <div className="profile-image">

                </div>
                <div className="profile-info">
                    <div className="address-heading">Address</div>
                    <GenericField
                        key="street_input"
                        placeholder="e.g. 5th Avenue"
                        genericClass="profile-generic"
                        value={props.userInfo.street}
                        onChange={(e) => props.onChange("street", e.target.value)}
                        id={"street"}
                        label={"Street"}
                        type={"text"}
                        className="profile-input"
                        validationMessage={props.validation.street}
                    />
                    <div className="city-zip">
                        <div className="address-width">
                            <GenericField
                                key="city_input"
                                placeholder="e.g. New York"
                                genericClass="profile-generic"
                                value={props.userInfo.city}
                                onChange={(e) => props.onChange("city", e.target.value)}
                                id={"city"}
                                label={"City"}
                                type={"text"}
                                className="profile-input"
                            />
                        </div>
                        <div className="address-width">
                            <GenericField
                                key="zipCode_input"
                                placeholder="e.g. 10065"
                                genericClass="profile-generic"
                                value={props.userInfo.zipCode}
                                onChange={(e) => props.onChange("zipCode", e.target.value)}
                                id={"zipCode"}
                                label={"ZipCode"}
                                type={"text"}
                                className="profile-input"
                                validationMessage={props.validation.zipCode}
                            />
                        </div>
                    </div>
                    <GenericField
                        key="state_input"
                        placeholder="e.g. New York"
                        genericClass="profile-generic"
                        value={props.userInfo.state}
                        onChange={(e) => props.onChange("state", e.target.value)}
                        id={"state"}
                        label={"State"}
                        type={"text"}
                        className="profile-input"
                        validationMessage={props.validation.state}
                    />
                    <GenericField
                        key="country_input"
                        placeholder="e.g. New York"
                        genericClass="profile-generic"
                        value={props.userInfo.country}
                        onChange={(e) => props.onChange("country", e.target.value)}
                        id={"country"}
                        label={"Country"}
                        type={"text"}
                        className="profile-input"
                    />
                </div>
            </div>
        </div >
    )
}

export default AdressInfo;