import React from "react";
import "../../index.css"
import GenericField from "../FormField/GenericField"
import Dropdown from "react-dropdown"
import CardInfo from "../UserProfile/CardInfo";
import CardInfoContent from "../UserProfile/CardInfoContent";
import BackButton from "../../pages/Seller/BackButton";
import NextButton from "../../pages/Seller/NextButton";

const LocationAndShipping = props => {

    return (
        <div>
            <div id="wizard-location-wrapper" className="wrapper seller-wrapper">
                <div className="user-box seller-box">
                    <div className="profile-heading seller-heading">LOCATION & SHIPPING</div>
                    <div id="wizard-location-content" className="become-seller-content">
                        <GenericField
                            key="wizard_street_input"
                            placeholder="e.g. 5th Avenue"
                            genericClass="wizard-generic"
                            value={props.userInfo.street}
                            onChange={(e) => props.onChange("street", e.target.value, "address")}
                            id={"wizard_street"}
                            label={"Address"}
                            type={"text"}
                            className="wizard-input"
                            validationMessage={props.validation.street}
                        />
                        <div className="wizard-country-city">
                            <div id="wizard-country-dropdown">
                                <Dropdown
                                    className="country-dropdown"
                                    menuClassName="gender-dropdown-menu"
                                    controlClassName="control-dropdown"
                                    placeholder="Select country"
                                    value={props.userInfo.country}
                                    options={props.countryOptions}
                                    onChange={(e) => props.onCountryChange("country", e.value, "address")}
                                />
                                <small>
                                    <label className={"validation-error small"}>{props.validation.country}</label>
                                </small>
                            </div>
                            <div id="wizard-city-dropdown">
                                <Dropdown
                                    className="country-dropdown"
                                    menuClassName="gender-dropdown-menu"
                                    controlClassName="control-dropdown"
                                    placeholder="Select city"
                                    value={props.userInfo.city}
                                    options={props.cityOptions}
                                    onChange={(e) => props.onChange("city", e.value, "address")}
                                />
                                <small>
                                    <label className={"validation-error small"}>{props.validation.city}</label>
                                </small>
                            </div>
                        </div>
                        <GenericField
                            key="wizard_zip_input"
                            placeholder="e.g. 70000"
                            genericClass="wizard-generic"
                            value={props.userInfo.zipCode}
                            onChange={(e) => props.onChange("zipCode", e.target.value, "address")}
                            id={"wizard_zip"}
                            label={"Zip Code"}
                            type={"text"}
                            className="wizard-input"
                            validationMessage={props.validation.zipCode}
                        />
                        <GenericField
                            key="wizard_phone_input"
                            placeholder="e.g. 999-999-999"
                            genericClass="wizard-generic"
                            value={props.userInfo.phoneNumber}
                            onChange={(e) => props.onChange("phoneNumber", e.target.value, "user")}
                            id={"wizard_phone"}
                            label={"Phone"}
                            type={"text"}
                            className="wizard-input"
                            validationMessage={props.validation.phoneNumber}
                        />

                        <div className="bear-shipping">
                            <input id="bear_shipp_cost" name="bear_shipp_cost" type="checkbox" value={props.bearShipping} onChange={(e) => props.setBearShipping(e.target.checked)} />
                            <label for="bear_shipp_cost">Do you want to bear shipping cost?</label>
                            <p>The average priece of shipping cost is $10.00. <br /> You have to provide us payment information.</p>
                        </div>
                        <div className="bear-shipping">
                            <input id="feature_product" name="feature_product" type="checkbox" value={props.featureProduct} onChange={(e) => props.setFeatureProduct(e.target.checked)} />
                            <label for="feature_product">Do you want to feature this product?</label>
                            <p>You have to provide us payment information.</p>
                        </div>

                        <div id="wizard-card-info" className={props.bearShipping || props.featureProduct ? "wizard-card-info" : "wizard-card-info-inactive"}>
                            <CardInfoContent
                                monthOptions={props.monthOptions}
                                yearOptions={props.yearOptions}
                                onChange={props.onChange}
                                userInfo={props.userInfo}
                                validation={props.cardValidation}
                                wrapperClass="wizard-card-info-wrapper"
                            />
                        </div>
                        <div id="wizard-general-button" className="wizard-nav-buttons">
                            <BackButton
                                onClick={props.onBackClick}
                            />
                            <NextButton
                                text="DONE"
                                isDone={true}
                                className="next-done"
                                onClick={props.onDoneClick}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div >

    )
}

export default LocationAndShipping;