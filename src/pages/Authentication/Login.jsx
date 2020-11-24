import React from "react";
import GenericField from "../../Components/FormField/GenericField"
import { handleFieldChange } from "../index.jsx"
import axios from "axios"
import "../../index.css"
import PageName from "../HeaderFooter/PageName"
import { useHistory } from "react-router-dom";
import Header from "../HeaderFooter/Header";

const Login = props => {
    const [user, setUser] = React.useState({
        email: "",
        password: ""
    })
    const [errorMessage, setErrorMessage] = React.useState("")

    let url = props.baseUrl + "/login"
    let history = useHistory()

    return (
        <div>
            <Header />
            <PageName pageName="login" />
            <div id="login-page" className={"form-box"}>
                <div className={"form"}>
                    <div className={"form-title"}>
                        LOGIN
                </div>
                    <GenericField genericClass="generic-field" id={"email"} name={"email"} label={"Email"} className={"input-field"} type={"text"} onChange={(e) => handleFieldChange(e, setUser)} />
                    <GenericField genericClass="generic-field" id={"password"} name={"password"} label={"Password"} className={"input-field"} type={"password"} onChange={(e) => handleFieldChange(e, setUser)} />
                    <small>
                        <label className={"validation-error"}>{errorMessage}</label>
                    </small>
                    <button id="login-btn-login" type={"button"} className={"btn-login"} onClick={() => handleLoginClick(user)} >LOGIN</button>
                </div>
            </div>
        </div>
    )
    function handleLoginClick(user) {

        axios.post(url, user)
            .then(response => {
                document.cookie = "token=" + response.data.token + "; path=/; max-age=6000;"
                if (history.location.state != null && history.location.state.from == "registration") {
                    history.push("/")
                }
                else {
                    history.goBack()
                }
            })
            .catch(error => {
                setErrorMessage("Invalid username or password")
            })
    }

}

export default Login