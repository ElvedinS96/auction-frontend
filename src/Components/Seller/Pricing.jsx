import React from "react";
import "../../index.css"
import "react-datetime/css/react-datetime.css"
import DateTime from "react-datetime"
import { FaRegCalendarAlt } from "react-icons/fa"
import BackButton from "../../pages/Seller/BackButton";
import NextButton from "../../pages/Seller/NextButton";

const Pricing = props => {

    return (
        <div>
            <div id="wizard-pricing-wrapper" className="wrapper seller-wrapper">
                <div className="user-box seller-box">
                    <div className="profile-heading seller-heading">SET PRICES</div>
                    <div id="wizard-pricing-content" className="become-seller-content">
                        <div id="wizard-entering-price">
                            <label>Your start Price</label>
                            <div className="wizard-price">
                                <div className="wizard-dolar-sign">$</div>
                                <div className="wizard-price-input-wrapper">
                                    <input
                                        id="wizard-pricing-input-price"
                                        placeholder="e.g. 100"
                                        name="wizard-price"
                                        type="number"
                                        onChange={(e) => props.onChange("price", e.target.value)}
                                        value={props.product.price}
                                        className="wizard-price-input"
                                    />
                                </div>
                            </div>
                            <small>
                                <label className={"validation-error small"}>{props.validation.price}</label>
                            </small>
                        </div>
                        <div id="wizard-dates">
                            <div id="wizard-start-date">
                                <label>Start date</label>
                                <DateTime
                                    value={props.product.startDate}
                                    utc={true}
                                    onChange={(e) => props.onChange("startDate", e.valueOf())}
                                    closeOnSelect={true}
                                />
                                <div className="wizard-calendar-icon-start"><FaRegCalendarAlt /></div>
                            </div>
                            <div id="wizard-end-date">
                                <label>End date</label>
                                <DateTime
                                    value={props.product.endDate}
                                    utc={true}
                                    onChange={(e) => props.onChange("endDate", e.valueOf())}
                                    closeOnSelect={true}
                                />
                                <div className="wizard-calendar-icon-end"><FaRegCalendarAlt /></div>
                            </div>
                        </div>
                        <div id="wizard-auction-paragraph">
                            <p>The auction will be automatically closed when the end time comes. The highest bid will win the auction.</p>
                        </div>
                        <div id="wizard-general-button" className="wizard-nav-buttons">
                            <BackButton
                                onClick={props.onBackClick}
                            />
                            <NextButton
                                text="NEXT"
                                className="next-button"
                                onClick={props.onNextClick}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div >

    )
}

export default Pricing;