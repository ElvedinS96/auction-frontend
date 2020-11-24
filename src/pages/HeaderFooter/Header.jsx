import React from "react"
import { useEffect } from "react"
import { useState } from "react"
import { useHistory } from "react-router-dom"
import "../../index.css"
import tokenExists from "../../Util/tokenExists"
import { AiFillTwitterCircle, AiFillGooglePlusCircle, AiFillInstagram, AiFillFacebook } from "react-icons/ai"

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

    useEffect(() => {

        if (tokenExists()) {
            setLoginText({ login: "Logout", or: "", create: "" })
        }

        if (props.active != null) {
            setActive(props.active)
        }

    }, [])

    function handleEnterPress(e) {
        if (e.key === "Enter") {
            onSearchClick()
        }
    }

    return (
        <div>
            <div className="header header-top">
                <div className="wrapper header-login">
                    <div className="social-networks">
                        <AiFillFacebook className="soc-icon" color="grey" />
                        <AiFillInstagram className="soc-icon" color="grey" />
                        <AiFillTwitterCircle className="soc-icon" color="grey" />
                        <AiFillGooglePlusCircle className="soc-icon" color="grey" />
                    </div>
                    <div className="login-acccount">
                        <button onClick={() => handleLoginClick()} className="header-text">{loginText.login}</button>
                        <label className="header-or">{loginText.or}</label>
                        <a className="header-text" href="/register">{loginText.create}</a>
                    </div>
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
                        <input onKeyPress={(e) => handleEnterPress(e)} placeholder="Try enter: Shoes" value={searchText} type="text" onChange={(e) => setSearchText(e.target.value)} />
                        <button onClick={() => onSearchClick()}></button>
                    </div>

                    <div className="header-nav">
                        <div><a className={active.home} href="/">HOME</a></div>
                        <div><a className={active.shop} href="/shop">SHOP</a></div>
                        <div className="my-account-header">
                            <a className={active.account}>MY ACCOUNT</a>
                            <div class="dropdown-content">
                                <a
                                    className={"my-account " + (props.accountActive == null ? "" : props.accountActive.profile)}
                                    href="/account?tab=profile">
                                    Profile
                                </a>
                                <a
                                    className={"my-account " + (props.accountActive == null ? "" : props.accountActive.bids)}
                                    href="/account?tab=bids">
                                    Your Bids
                                </a>
                                <a
                                    className={"my-account " + (props.accountActive == null ? "" : props.accountActive.settings)}
                                    href="/account?tab=settings">
                                    Settings
                                </a>
                            </div></div>

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