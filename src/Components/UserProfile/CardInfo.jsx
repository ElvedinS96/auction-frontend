import React from "react";
import "../../index.css"
import GenericField from "../FormField/GenericField";
import Dropdown from "react-dropdown"

const CardInfo = props => {

    return (
        <div ref={props.cardInfoRef} className="user-box profile-box">
            <div className="profile-heading">CARD INFORMATION</div>
            <div className="profile">
                <div className="profile-image"></div>
                <div className="profile-info">
                    <div className="card-ckeckbox" >
                        <input
                            checked={props.userInfo.paypal}
                            type="checkbox"
                            id="notf-paypal"
                            name="notf-paypal"
                            value="PayPal"
                            onChange={(e) => props.onChange("paypal", e.target.checked, "cardInformation")} />
                        <label className="generic-field" for="notf-paypal">Pay Pal</label>
                    </div>
                    <div className="card-ckeckbox" >
                        <input
                            checked={props.userInfo.creditCard}
                            type="checkbox"
                            id="notf-card"
                            name="notf-card"
                            value="Card"
                            onChange={(e) => props.onChange("creditCard", e.target.checked, "cardInformation")} />
                        <label className="generic-field" for="notf-card">Credit Card</label>
                    </div>
                    <div className="accept-cards">
                        <label>We accpet the following credit cards</label>
                        <div className="cards-logos">
                            <div><img src="https://firebasestorage.googleapis.com/v0/b/auction-internship-app.appspot.com/o/images%2FFree%20Credit%20Card%20Logo%20(100).png?alt=media&token=f0b2fec5-f69f-44c8-849d-c27c26cc1495" /></div>
                            <div><img src="https://firebasestorage.googleapis.com/v0/b/auction-internship-app.appspot.com/o/images%2FFree%20Credit%20Card%20Logo%20(58).png?alt=media&token=3508a683-caab-43db-a7ef-4bbdd5b15cb8" /></div>
                            <div><img src="https://firebasestorage.googleapis.com/v0/b/auction-internship-app.appspot.com/o/images%2FFree%20Credit%20Card%20Logo%20(52).png?alt=media&token=335c5249-01d4-4ba8-8faf-6170dac62238" /></div>
                            <div><img src="https://firebasestorage.googleapis.com/v0/b/auction-internship-app.appspot.com/o/images%2FFree%20Credit%20Card%20Logo%20(10).png?alt=media&token=3e57faba-67f3-4a11-bc9e-e033361bd723" /></div>
                        </div>
                    </div>
                    <div className="city-zip">
                        <div className="address-width">
                            <GenericField
                                key="nameOnCard_input"
                                placeholder="e.g. Adam Smith"
                                genericClass="profile-generic"
                                value={props.userInfo.nameOnCard}
                                onChange={(e) => props.onChange("nameOnCard", e.target.value, "cardInformation")}
                                id={"nameOnCard"}
                                label={"Name on card"}
                                type={"text"}
                                className="profile-input"
                                validationMessage={props.validation.nameOnCard}
                            />
                        </div>
                        <div className="address-width">
                            <GenericField
                                key="cardNumber_input"
                                placeholder="e.g. 4242-4242-4242-4242"
                                genericClass="profile-generic"
                                value={props.userInfo.cardNumber}
                                onChange={(e) => props.onChange("cardNumber", e.target.value, "cardInformation")}
                                id={"cardNumber"}
                                label={"Card Number"}
                                type={"text"}
                                className="profile-input"
                                validationMessage={props.validation.cardNumber}
                            />
                        </div>
                    </div>
                    <div className="city-zip">
                        <div className="address-width profile-label">
                            <label className="generic-field">Expiration Date</label>
                            <div className="birth-date exp-date">
                                <div className="year-wrapper-exp">
                                    <Dropdown
                                        className="year-dropdown"
                                        menuClassName="birth-dropdown-menu"
                                        controlClassName="control-dropdown"
                                        placeholder="Year"
                                        value={props.userInfo.cardExpYear}
                                        options={props.yearOptions}
                                        onChange={(e) => props.onChange("cardExpYear", e.value.toString(), "cardInformation")}
                                    />
                                    <small>
                                        <label className={"validation-error small"}>{props.validation.cardExpYear}</label>
                                    </small>
                                </div>
                                <div className="month-wrapper-exp">
                                    <Dropdown
                                        className="month-dropdown"
                                        menuClassName="birth-dropdown-menu"
                                        controlClassName="control-dropdown"
                                        placeholder="Month"
                                        value={props.userInfo.cardExpMonth}
                                        options={props.monthOptions}
                                        onChange={(e) => props.onChange("cardExpMonth", e.label.toString(), "cardInformation")}
                                    />
                                    <small>
                                        <label className={"validation-error small"}>{props.validation.cardExpMonth}</label>
                                    </small>
                                </div>
                            </div>
                        </div>
                        <div className="address-width">
                            <div className="profile-label">
                                <GenericField
                                    key="cvc_input"
                                    placeholder="e.g. 1234"
                                    genericClass="card-exp"
                                    value={props.userInfo.cvc}
                                    onChange={(e) => props.onChange("cvc", e.target.value, "cardInformation")}
                                    id={"cvc"}
                                    label={"CVC/CW"}
                                    type={"text"}
                                    className="profile-input"
                                    validationMessage={props.validation.cvc}
                                />
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default CardInfo;