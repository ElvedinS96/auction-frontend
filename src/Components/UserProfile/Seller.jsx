import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import "../../index.css"

const Seller = props => {

    const history = useHistory()
    const [active, setActive] = useState(true)

    function Biddings() {
        if (active && props.activeProducts.length == 0) {
            return <tr className="bider-row"><td colSpan={4} className="bider-name">You don't have active products</td></tr>
        }
        else if (active) {
            return <div>tabela</div>
        }
        if (!active && props.soldProducts.length == 0) {
            return <tr className="bider-row"><td colSpan={4} className="bider-name">You don't have sold products</td></tr>
        }
        else if (!active) {
            return <div>tabela</div>
        }
    }

    return (
        <div id="profile-seller" className="user-bids" >
            <div id="profile-seller-header" className="profile-seller-header">
                <div className="profile-seller-header-left">
                    <div onClick={() => setActive(true)}
                        className={active ? "profile-seller-header-button profile-seller-header-button-active" : "profile-seller-header-button"}>
                        Active
                    </div>
                    <div onClick={() => setActive(false)}
                        className={!active ? "profile-seller-header-button profile-seller-header-button-active" : "profile-seller-header-button"}>
                        Sold
                    </div>
                </div>
                <div onClick={() => history.push("/selling")} className="profile-seller-header-button profile-seller-header-button-active" >
                    Sell New
                </div>
            </div>
            <table cellspacing="0">
                <tr className="user-bids-heading">
                    <td className="user-bids-item">Item</td>
                    <td colSpan={2}>Name</td>
                    <td>{active ? "Time left" : "Time ended"}</td>
                    <td><div className="user-bids-center">Your Price</div></td>
                    <td><div className="user-bids-center">No.Bids</div></td>
                    <td><div className="user-bids-center">Highest Bid</div></td>
                    <td><div className="user-bids-center"></div></td>
                </tr>
                {Biddings()}
            </table>
        </div >
    )
}

export default Seller;