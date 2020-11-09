import React from "react"
import { useEffect } from "react"
import { useState } from "react"
import { useHistory } from "react-router-dom"
import "../../index.css"
import tokenExists from "../../Util/tokenExists"

const Header = props => {

    const history = useHistory()

    const [loginText, setLoginText] = useState({
        login: "Login",
        or: "or",
        create: "Create an Account"
    })

    const [active, setActive] = useState({
        home: "nav-inactive",
        shop: "nav-inactive",
        account: "nav-inactive"
    })
    const [searchText, setSearchText] = useState("")
    const history = useHistory()


    useEffect(() => {
        if (tokenExists()) {
            setLoginText({ login: "Logout", or: "", create: "" })
        }

        if (props.active != null) {
            setActive(props.active)
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
                <div className="wrapper header-middle-wrapper">
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

                    <div className="search">
                        <input value={searchText} type="text" onChange={(e) => setSearchText(e.target.value)} />
                        <button onClick={() => onSearchClick()}></button>
                    </div>

                    <div className="header-nav">
                        <a className={active.home} href="/">HOME</a>
                        <a className={active.shop} href="/shop">SHOP</a>
                        <a className={active.account} href="#">MY ACCOUNT</a>
                    </div>
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
            if (window.location.pathname == "/register") {
                history.push("/login", { from: 'registration' })
            }
            else {
                history.push("/login")
            }

        }
    }

    function onSearchClick() {
        if (props.onClick != null) {
            props.onClick(searchText)
        }
        else {
            history.push("/shop?name=" + searchText)
        }
        setSearchText("")
    }
}

export default Header;