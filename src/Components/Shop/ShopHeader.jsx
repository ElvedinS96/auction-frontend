import React from "react";
import "../../index.css"
import { BsFillGrid3X3GapFill } from "react-icons/bs"
import { FaThList } from "react-icons/fa"

const ShopHeader = ({ ...props }) => {
    return (
        <div id="shop-right-header" className="shop-header">
            <div>
                <select className="sorting-dropdown" onChange={props.handleDropdown} value={props.dropValue}>
                    <option value="default">Default Sorting</option>
                    <option value="popularity">Sort by Popularity</option>
                    <option value="rating">Sort by Rating</option>
                    <option value="newness">Sort by Newness</option>
                    <option value="price">Sort by Price</option>
                </select>
            </div>
            <div id="shop-right-select-view" className="shop-header-view">
                <span className={props.gridClass} onClick={(e) => props.onClick(true)}><BsFillGrid3X3GapFill /> <label>Grid</label></span>
                <span className={props.listClass} onClick={(e) => props.onClick(false)}><FaThList /> <label>List</label></span>
            </div>
        </div >
    )
}

export default ShopHeader;