import React from "react";
import "../../index.css"
import { AiFillTwitterCircle, AiFillGooglePlusCircle, AiFillInstagram, AiFillFacebook } from "react-icons/ai"

const Footer = props => {
    return (
        <div className="footer">
            <div className="footer-content">
                <div>
                    <div className="footer-text">AUCTION</div>
                    <ul>
                        <li><a href="/about">About Us</a></li>
                        <li><a href="/terms">Terms and Conditions</a></li>
                        <li><a href="/privacy">Privacy and Policy</a></li>
                    </ul>
                </div>
                <div>
                    <div className="footer-text">GET IN TOUCH</div>
                    <label className="footer-contact">Call Us at +123 797-567-2535</label>
                    <br />
                    <label className="footer-contact">support@auction.com</label>
                    <div className="social-networks">
                        <AiFillFacebook className="soc-icon" color="grey" />
                        <AiFillInstagram className="soc-icon" color="grey" />
                        <AiFillTwitterCircle className="soc-icon" color="grey" />
                        <AiFillGooglePlusCircle className="soc-icon" color="grey" />
                    </div>
                </div>
                <div>
                    <div className="footer-text">NEWSLETTER</div>
                    <label className="footer-contact">Enter your email address and get notified<br />about new products. We hate spam!</label>
                    <div>
                        <input type="text" placeholder="Your Email address" />
                        <button>GO <span className="bid-arrow">&#10095;</span></button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Footer;