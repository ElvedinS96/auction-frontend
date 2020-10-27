import React from "react"
import "../../index.css"
import tokenExists from "../../Util/tokenExists"

const Header = props => {

    const [loginText, setLoginText] = React.useState({
        login: "Login",
        or: "or",
        create: "Create an Account"
    })

    React.useEffect(() => {
        if (tokenExists()) {
            setLoginText({ login: "Logout", or: "", create: "" })
        }
    }, [])

    return (
        <div>
            <div className="header header-top">
                <div className="social-networks"></div>
                <div className="login-acccount">
                    <button onClick={() => handleLoginClick()} className="header-text">{loginText.login}</button>
                    <label className="header-or">{loginText.or}</label>
                    <a className="header-text" href="/register">{loginText.create}</a>
                </div>
            </div>
            <div className="header-middle">
                <div className="logo">
                    <div className="line1">
                        <div className="logo-line logo-line1"></div>
                    </div>
                    <div className="line2">
                        <div className="logo-line logo-line2"></div>
                    </div>
                    <div className="line3">
                        <div className="logo-line logo-line3"></div>
                    </div>
                    <span className="header-title"><a href="/">AUCTION</a></span>

                </div>

            </div>
        </div>
    )

    function handleLoginClick() {

        if (tokenExists()) {
            document.cookie = "token=; path=/; max-age=-9999999;"
            setLoginText({ login: "Login", or: "or", create: "Create an Account" })
            window.location.href = "/"
        }
        else {
            window.location.href = "/login"
        }
    }
}

export default Header;