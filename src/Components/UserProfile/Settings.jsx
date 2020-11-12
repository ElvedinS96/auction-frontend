import React from "react";
import "../../index.css"

const Settings = props => {

    return (
        <div className="settings-page">
            <div className="user-box settings">
                <div className="settings-heading">
                    <span>Policy and Community</span>
                </div>
                <div>
                    <div className="settings-text" >
                        Receive updates on bids and seller's offers.
                        <br />
                        Stay informed through:
                        </div>
                    <div className="settings-text-notf" >
                        <input type="checkbox" id="notf-email" name="notf-email" value="Email" />
                        <label for="notf-email">Email</label>
                    </div>
                    <div className="settings-text-notf" >
                        <input type="checkbox" id="notf-push" name="notf-push" value="Push" />
                        <label for="notf-push">Push Notifications</label>
                    </div>
                    <div className="settings-text-notf" >
                        <input type="checkbox" id="notf-msg" name="notf-msg" value="Message" />
                        <label for="notf-msg">Text Messages</label>
                    </div>
                </div>
            </div>

            <div className="user-box settings">
                <div className="settings-heading">
                    <span>Contact Information</span>
                </div>
                <div>
                    <div className="settings-text" >This information can be edited on your profile.</div>
                    <div className="settings-text" >
                        <div>Email&nbsp;</div>
                        <div className="settings-contact">adam.smith@mail.com</div>
                    </div>
                    <div className="settings-text" >
                        <div>Phone</div>
                        <div className="settings-contact">555-5555-5555</div>
                    </div>
                </div>
            </div>
        </div >
    )
}

export default Settings;