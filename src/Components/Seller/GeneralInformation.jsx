import React from "react";
import "../../index.css"
import GenericField from "../FormField/GenericField";
import Dropdown from "react-dropdown"
import ImageDropzone from "../../pages/Seller/ImageDropzone";
import NextButton from "../../pages/Seller/NextButton";
import BackButton from "../../pages/Seller/BackButton";

const GeneralInformation = props => {

    return (
        <div>
            <div id="wizard-general-wrapper" className="wrapper seller-wrapper">
                <div className="user-box seller-box">
                    <div className="profile-heading seller-heading">DETAIL INFORMATION ABOUT PRODUCT</div>
                    <div id="wizard-general-content" className="become-seller-content">
                        <div className="wizard-input-field">
                            <GenericField
                                key="product_name_input"
                                placeholder="e.g. Running Shoes"
                                genericClass="wizard-generic"
                                value={props.product.name}
                                onChange={(e) => props.onChange("name", e.target.value)}
                                id={"product_name"}
                                label={"What do you sell?"}
                                type={"text"}
                                className="wizard-input"
                                validationMessage={props.validation.name}
                            />
                            <div className="wizard-input-field-desc"><label>2-5 words ({60 - props.product.name.length} characters)</label></div>
                        </div>
                        <div className="wizard-categories">
                            <div className="wizard-dropdowns">
                                <Dropdown
                                    className="country-dropdown"
                                    menuClassName="gender-dropdown-menu"
                                    controlClassName="control-dropdown"
                                    placeholder="Select Category"
                                    value={props.product.categoryName}
                                    options={props.categoryOptions}
                                    onChange={(e) => props.onCategoryChange(e.value, e.label)}
                                />
                                <small>
                                    <label className={"validation-error small"}>{props.validation.category}</label>
                                </small>
                            </div>
                            <div className="wizard-dropdowns">
                                <Dropdown
                                    className="country-dropdown"
                                    menuClassName="gender-dropdown-menu"
                                    controlClassName="control-dropdown"
                                    placeholder="Select Subcategory"
                                    value={props.product.subcategoryName}
                                    options={props.subcategoryOptions}
                                    onChange={(e) => { props.onChange("subcategoryName", e.label); props.onChange("subcategoryId", e.value) }}
                                />
                                <small>
                                    <label className={"validation-error small"}>{props.validation.subcategory}</label>
                                </small>
                            </div>
                        </div>
                        <div className="wizard-description">
                            <div>
                                <label className="wizard-description-label">Description</label>
                            </div>
                            <div className="wizard-text-area">
                                <textarea
                                    name="product_description"
                                    id="product_description"
                                    onChange={(e) => props.onChange("description", e.target.value)}
                                >{props.product.description}</textarea>
                            </div>
                            <small>
                                <label className={"validation-error small"}>{props.validation.description}</label>
                            </small>
                            <div className="wizard-input-field-desc"><label>100 words ({700 - props.product.description.length} characters)</label></div>
                        </div>
                        <div className="wizard-images">
                            <ImageDropzone setSelectedPhotos={props.setSelectedPhotos} />
                            <small>
                                <label className={"validation-error small"}>{props.validation.images}</label>
                            </small>
                        </div>
                        <div id="wizard-general-button" className="wizard-nav-buttons">
                            <BackButton
                                className="back-inactive"
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

export default GeneralInformation;