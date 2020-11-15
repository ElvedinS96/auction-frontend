import React from "react";
import "../../index.css"
import GenericField from "../FormField/GenericField";
import Dropdown from "react-dropdown"

const PersonalInfo = props => {

    return (
        <div className="user-box profile-box">
            <div className="profile-heading">REQUIRED</div>
            <div className="profile">
                <div className="profile-image">
                    <div>
                        <img src={props.userInfo.imageUrl} />
                    </div>
                    <div>
                        <input
                            type="file"
                            id="files"
                            class="hidden"
                            onChange={(e) => props.changeImage(e)}
                            accept="image/jpeg, image/x-png"
                        />
                        <div className="change-image-button"><label for="files">CHANGE PHOTO</label></div>

                    </div>
                </div>
                <div className="profile-info">
                    <GenericField
                        key="firstName_input"
                        genericClass="profile-generic"
                        value={props.userInfo.firstName}
                        onChange={(e) => props.onChange("firstName", e.target.value)}
                        id={"firstName"}
                        label={"First Name"}
                        type={"text"}
                        className="profile-input"
                        validationMessage={props.validation.firstName}
                    />
                    <GenericField
                        key="lastName_input"
                        genericClass="profile-generic"
                        value={props.userInfo.lastName}
                        onChange={(e) => props.onChange("lastName", e.target.value)}
                        id={"lastName"}
                        label={"Last Name"}
                        type={"text"}
                        className="profile-input"
                        validationMessage={props.validation.lastName}
                    />
                    <div className="profile-label">
                        <label className="generic-field">I am</label>
                        <Dropdown
                            className="gender-dropdown"
                            menuClassName="gender-dropdown-menu"
                            controlClassName="control-dropdown"
                            placeholder="Select gender"
                            value={props.userInfo.gender}
                            options={props.genderOptions}
                            onChange={(e) => props.onChange("gender", e.value)}
                        />
                    </div>
                    <div className="profile-label">
                        <label className="generic-field">Date of Birth</label>
                        <div className="birth-date">
                            <div className="month-wrapper">
                                <Dropdown
                                    className="month-dropdown"
                                    menuClassName="birth-dropdown-menu"
                                    controlClassName="control-dropdown"
                                    placeholder="Month"
                                    value={props.userInfo.birthMonth}
                                    options={props.monthOptions}
                                    onChange={(e) => props.onChange("birthMonth", e.label.toString())}
                                />
                            </div>
                            <div className="day-wrapper">
                                <Dropdown
                                    className="day-dropdown"
                                    menuClassName="birth-dropdown-menu"
                                    controlClassName="control-dropdown"
                                    placeholder="Day"
                                    value={props.userInfo.birthDay}
                                    options={props.dayOptions}
                                    onChange={(e) => props.onChange("birthDay", e.value.toString())}
                                />
                            </div>
                            <div className="year-wrapper">
                                <Dropdown
                                    className="year-dropdown"
                                    menuClassName="birth-dropdown-menu"
                                    controlClassName="control-dropdown"
                                    placeholder="Year"
                                    value={props.userInfo.birthYear}
                                    options={props.yearOptions}
                                    onChange={(e) => props.onChange("birthYear", e.value.toString())}
                                />
                            </div>
                        </div>
                        <small>
                            <label className={"validation-error small"}>{props.validation.birthdate}</label>
                        </small>
                    </div>
                    <div>
                        <div className="profile-generic">
                            <label>Phone Number</label>
                            <div style={{ display: "flex" }} >
                                <input
                                    key="phone_input"
                                    value={props.userInfo.phoneNumber}
                                    onChange={(e) => props.onChange("phoneNumber", e.target.value)}
                                    id={"phoneNumber"}
                                    type={"text"}
                                    className="profile-phone"
                                />
                                <div className="phone-verified">Verified</div>
                            </div>
                            <small>
                                <label className={"validation-error"}>{props.validation.phoneNumber}</label>
                            </small>

                        </div>
                    </div>
                    <GenericField
                        key="email_input"
                        genericClass="profile-generic"
                        value={props.userInfo.email}
                        onChange={(e) => props.onChange("email", e.target.value)}
                        id={"email"}
                        label={"Email Address"}
                        type={"text"}
                        className="profile-input"
                        validationMessage={props.validation.email}
                    />
                </div>
            </div>
        </div>
    )
}

export default PersonalInfo;