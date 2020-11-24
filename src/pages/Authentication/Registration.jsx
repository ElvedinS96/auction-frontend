import React from "react";
import GenericField from "../../Components/FormField/GenericField"
import { handleFieldChange } from "../index.jsx"
import axios from "axios"
import "../../index.css"
import StatusBar from "../../Components/StatusBar/StatusBar"
import PageName from "../HeaderFooter/PageName"
import Header from "../HeaderFooter/Header";
import { useEffect } from "react";
import { validateFirstName, validateLastName, validateEmail } from "../../Util/Validation"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import { useHistory } from "react-router-dom";

const Registration = props => {

    const [user, setUser] = React.useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        imageUrl: "https://clinicforspecialchildren.org/wp-content/uploads/2016/08/avatar-placeholder.gif"
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

    const eye = <FontAwesomeIcon icon={faEye} />
    const [passwordShown, setPasswordShown] = React.useState(false);

    const history = useHistory()

    const togglePasswordVisiblity = () => {
        setPasswordShown(passwordShown ? false : true);
    };

    useEffect(() => {
        localStorage.statusMessage = ""
        localStorage.statusClass = ""
    })

    return (
        <div>
            <Header />
            <PageName pageName="register" />
            <StatusBar statusMessage={message} href="/login" refText={refText} className={statusStyle} />
            <div id="registration" className={"form-box"}>
                <div className={"form"}>
                    <div className={"form-title"}>
                        REGISTER
                </div>
                    <GenericField value={user.firstName} genericClass="generic-field" id={"firstName"} name={"firstName"} label={"First Name"} className={"input-field"} type={"text"} onChange={(e) => handleFieldChange(e, setUser)} validationMessage={validation.firstName} />
                    <GenericField value={user.lastName} genericClass="generic-field" id={"lastName"} name={"lastName"} label={"Last Name"} className={"input-field"} type={"text"} onChange={(e) => handleFieldChange(e, setUser)} validationMessage={validation.lastName} />
                    <GenericField value={user.email} genericClass="generic-field" id={"email"} name={"email"} label={"Email"} className={"input-field"} type={"text"} onChange={(e) => handleFieldChange(e, setUser)} validationMessage={validation.email} />
                    <div className="pass-wrapper">
                        <GenericField value={user.password} genericClass="generic-field" id={"password"} name={"password"} label={"Password"} className={"input-field"} type={passwordShown ? "text" : "password"} onChange={(e) => handleFieldChange(e, setUser)} validationMessage={validation.password} />
                        <i onClick={togglePasswordVisiblity}>{eye}</i>
                    </div>
                    <GenericField value={confirmPassword} genericClass="generic-field" id={"confirmPassword"} name={"confirmPassword"} label={"Confirm Password"} className={"input-field"} type={"password"} onChange={(e) => setConfirmPassword(e.target.value)} validationMessage={validation.confirmPassword} />
                    <button id="registration-btn-register" type={"button"} className={"btn-submit"} onClick={(e) => handleRegisterClick(e, user)} >REGISTER</button>
                    <p className="have-account">
                        Already have an account? <label onClick={() => history.push("/login", { from: 'registration' })} className="login-word">Login</label>
                    </p>
                </div>
            </div>
        </div>


    )

    function handleRegisterClick(e, user) {

        if (validate(user)) {

            var request = {
                userRegister: user
            }

            axios.post(url, request)
                .then(response => {
                    setMessage("You are registered! Login ")
                    setRefText("here")
                    setStatusStyle("status status-success")

                    setUser({
                        firstName: "",
                        lastName: "",
                        email: "",
                        password: ""
                    })
                    setConfirmPassword("")
                    setPasswordShown(false)
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

        var firstNameValidation = validateFirstName(user.firstName)
        if (!firstNameValidation.valid) {
            validationMessage.firstName = firstNameValidation.message
            isValid = false;
        }

        var lastNameValidation = validateLastName(user.lastName)
        if (!lastNameValidation.valid) {
            validationMessage.lastName = lastNameValidation.message
            isValid = false;
        }

        var emailValidation = validateEmail(user.email)
        if (!emailValidation.valid) {
            validationMessage.email = emailValidation.message
            isValid = false;
        }

        if (!user.password || user.password.length < 5) {
            validationMessage.password = "Password must be longer than 5 letters"
            isValid = false;
        }
        if (user.password.trim().length == 0) {
            validationMessage.password = "Password is required"
            isValid = false
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