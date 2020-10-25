import React from "react";
import GenericField from "../../Components/FormField/GenericField"
import { handleFieldChange } from "../index.jsx"
import axios from "axios"
import "../../index.css"
import StatusBar from "../../Components/StatusBar/StatusBar"
import PageName from "../HeaderFooter/PageName"
import Header from "../HeaderFooter/Header";
import { useEffect } from "react";


const Registration = props => {

    const [user, setUser] = React.useState({
        firstName: "",
        lastName: "",
        email: "",
        password: ""
    })

    const [validation, setValidation] = React.useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: ""
    })

    const [confirmPassword, setConfirmPassword] = React.useState("")

    const [message, setMessage] = React.useState("")
    const [statusStyle, setStatusStyle] = React.useState("")
    const [refText, setRefText] = React.useState("")

    let url = props.baseUrl + "/user"

    useEffect(() => {
        localStorage.statusMessage = ""
        localStorage.statusClass = ""
    })

    return (
        <div>
            <Header />
            <PageName pageName="register" />
            <StatusBar statusMessage={message} href="/login" refText={refText} className={statusStyle} />
            <div className={"form-box"}>
                <div className={"form"}>
                    <div className={"form-title"}>
                        REGISTER
                </div>
                    <GenericField genericClass="generic-field" id={"firstName"} name={"firstName"} label={"First Name"} className={"input-field"} type={"text"} onChange={(e) => handleFieldChange(e, setUser)} validationMessage={validation.firstName} />
                    <GenericField genericClass="generic-field" id={"lastName"} name={"lastName"} label={"Last Name"} className={"input-field"} type={"text"} onChange={(e) => handleFieldChange(e, setUser)} validationMessage={validation.lastName} />
                    <GenericField genericClass="generic-field" id={"email"} name={"email"} label={"Email"} className={"input-field"} type={"text"} onChange={(e) => handleFieldChange(e, setUser)} validationMessage={validation.email} />
                    <GenericField genericClass="generic-field" id={"password"} name={"password"} label={"Password"} className={"input-field"} type={"password"} onChange={(e) => handleFieldChange(e, setUser)} validationMessage={validation.password} />
                    <GenericField genericClass="generic-field" id={"confirmPassword"} name={"confirmPassword"} label={"Confirm Password"} className={"input-field"} type={"password"} onChange={(e) => setConfirmPassword(e.target.value)} validationMessage={validation.confirmPassword} />
                    <button type={"button"} className={"btn-submit"} onClick={(e) => handleRegisterClick(e, user)} >REGISTER</button>
                    <p className="have-account">
                        Already have an account? <a className="login-word" href="/login">Login</a>
                    </p>
                </div>
            </div>
        </div>


    )

    function handleRegisterClick(e, user) {

        if (validate(user)) {
            axios.post(url, user)
                .then(response => {
                    setMessage("You are registered! Login ")
                    setRefText("here")
                    setStatusStyle("status status-success")
                })
                .catch(error => {
                    setMessage("User with given email already exists")
                    setRefText("")
                    setStatusStyle("status status-error")
                })
        }
    }

    function validate(user) {

        var isValid = true;
        var validationMessage = {
            firstName: "",
            lastName: "",
            email: "",
            password: ""
        }

        if (!user.firstName) {
            validationMessage.firstName = "First Name is required"
            isValid = false;
        }

        if (!user.lastName) {
            validationMessage.lastName = "Last Name is required"
            isValid = false;
        }

        if (!user.email || !user.email.includes("@")) {
            validationMessage.email = "Invalid email"
            isValid = false;
        }

        if (!user.password || user.password.length < 5) {
            validationMessage.password = "Password must be longer than 5 letters"
            isValid = false;
        }

        if (user.password !== confirmPassword) {
            validationMessage.confirmPassword = "Password is not matching"
            isValid = false;
        }

        setValidation(validationMessage)

        return isValid
    }

}

export default Registration