import React from "react";
import { useState } from "react";
import Filters from "../../Components/Shop/Filter/Filters";
import ShopGrid from "../../Components/Shop/ShopGrid";
import ShopList from "../../Components/Shop/ShopList";
import Header from "../HeaderFooter/Header"
import PageName from "../HeaderFooter/PageName"
import "../../index.css"
import { useEffect } from "react";
import axios from "axios"
import { useHistory } from "react-router-dom";

const Shop = ({ ...props }) => {

    const history = useHistory()

    const [gridActive, setGridActive] = useState(true)
    const [gridClass, setGridClass] = useState("span-active")
    const [listClass, setListClass] = useState("")
    const [fillFilters, setFillFilters] = useState({
        colors: [],
        sizes: [],
        categories: [],
        prices: {
            minPrice: 0,
            maxPrice: 0,
            avgPrice: 0,
            pricesCount: []
        }
    })

    const [dropdownSelected, setDropdownSelected] = useState("default")
    const [activeCategory, setActiveCategory] = useState(0)
    const [activeSubcategory, setActiveSubcategory] = useState(0)
    const [activeColor, setActiveColor] = useState("")
    const [activeSize, setActiveSize] = useState("")

    useEffect(() => {

        const url = props.baseUrl + "/shop/filters"
        axios.get(url)
            .then(response => {
                setFillFilters(response.data)
            })
            .catch(error => {
                history.push("/500")
            })
    }, [dropdownSelected, activeCategory, activeSubcategory, activeColor, activeSize], [])

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
                    <Filters
                        filters={fillFilters}
                        activeCategory={activeCategory}
                        activeSubcategory={activeSubcategory}
                        setCategory={setActiveCategory}
                        setSubcategory={setActiveSubcategory}
                        setColor={setActiveColor}
                        setSize={setActiveSize}
                    />
                    <SetView />
                </div>
            </div>
        </div>
    )
}

export default Shop;