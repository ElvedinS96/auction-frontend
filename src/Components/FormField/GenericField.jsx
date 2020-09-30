import React from "react";
import "../../index.css"

const GenericField = ({ genericClass, label, validationMessage, ...props }) => {
    return (
        <div className={genericClass}>
            <label>{label}</label>
            <input {...props} />
            <small>
                <label className={"validation-error"}>{validationMessage}</label>
            </small>

        </div>
    );
}

export default GenericField;