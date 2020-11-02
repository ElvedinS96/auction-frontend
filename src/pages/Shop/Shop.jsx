import React from "react";
import { useState } from "react";
import Filters from "../../Components/Shop/Filter/Filters";
import ShopGrid from "../../Components/Shop/ShopGrid";
import ShopList from "../../Components/Shop/ShopList";
import Header from "../HeaderFooter/Header"
import PageName from "../HeaderFooter/PageName"
import "../../index.css"

const Shop = ({ ...props }) => {

    const [gridActive, setGridActive] = useState(true)
    const [dropdownSelected, setDropdownSelected] = useState("default")
    const [gridClass, setGridClass] = useState("span-active")
    const [listClass, setListClass] = useState("")

    function setGrid(value) {
        if (value) {
            setGridClass("span-active")
            setListClass("")
        }
        else {
            setGridClass("")
            setListClass("span-active")
        }
        setGridActive(value)
    }

    function SetView() {
        if (gridActive) {
            return <ShopGrid dropValue={dropdownSelected} handleDropdown={(e) => setDropdownSelected(e.target.value)} onClick={setGrid} gridClass={gridClass} listClass={listClass} />
        }
        return <ShopList dropValue={dropdownSelected} handleDropdown={(e) => setDropdownSelected(e.target.value)} onClick={setGrid} gridClass={gridClass} listClass={listClass} />
    }


    return (
        <div>
            <Header />
            <PageName pageName="SHOP" pageNav="SHOP / ALL CATEGORIES" />
            <div className="wrapper">
                <div className="shop-page">
                    <Filters />
                    <SetView />
                </div>
            </div>
        </div>
    )
}

export default Shop;