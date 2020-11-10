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
import { useHistory, useLocation } from "react-router-dom";
import { BiX } from "react-icons/bi"

const Shop = ({ ...props }) => {

    function useQuery() {
        return new URLSearchParams(useLocation().search);
    }

    const query = useQuery()
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
    const [active, setActive] = useState({
        home: "nav-inactive",
        shop: "nav-active",
        account: "nav-inactive"
    })

    const [dropdownSelected, setDropdownSelected] = useState("default")
    const [activeCategory, setActiveCategory] = useState(0)
    const [activeSubcategory, setActiveSubcategory] = useState(0)
    const [activeColor, setActiveColor] = useState("")
    const [activeSize, setActiveSize] = useState("")
    const [activeName, setActiveName] = useState("")
    const [products, setProducts] = useState([])
    const [minPrice, setMinPrice] = useState(-1)
    const [maxPrice, setMaxPrice] = useState(-1)
    const [pageNumber, setPageNumber] = useState(1)
    const PAGE_SIZE = 9
    const [exploreClass, setExploreClass] = useState("explore-more")

    function createRequest() {
        var request = {
            name: activeName,
            subcategoryId: activeSubcategory,
            color: activeColor,
            size: activeSize,
            minPrice: minPrice,
            maxPrice: maxPrice,
            order: dropdownSelected,
            pageNumber: pageNumber,
            pageSize: PAGE_SIZE
        }

        return request
    }

    useEffect(() => {
        if (query.get("name") != null) {
            setActiveName(query.get("name"))
        }

        var url = props.baseUrl + "/shop"
        axios.post(url, createRequest())
            .then(response => {

                if (response.data.length < PAGE_SIZE) {
                    setExploreClass("explore-disable")
                }
                else {
                    setExploreClass("explore-more")
                }
                if (pageNumber == 1) {
                    setProducts(response.data)
                }
                else {
                    var newProductsList = products.concat(response.data)
                    setProducts(newProductsList)
                }
            })
            .catch(error => {
                history.push(("/500"))
            })

        url = props.baseUrl + "/shop/filters"
        axios.get(url)
            .then(response => {
                setFillFilters(response.data)
            })
            .catch(error => {
                history.push("/500")
            })
    }, [dropdownSelected, activeSubcategory, activeColor, activeSize, activeName, pageNumber, minPrice, maxPrice], [])

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


    function exploreMore() {
        setPageNumber(pageNumber + 1)
    }

    function resetPageNumber() {
        setPageNumber(1)
    }

    function SetView() {

        if (gridActive) {
            return <ShopGrid exploreClass={exploreClass} exploreMore={exploreMore} products={products} dropValue={dropdownSelected} handleDropdown={(e) => setDropdownSelected(e.target.value)} onClick={setGrid} gridClass={gridClass} listClass={listClass} />
        }
        return <ShopList exploreClass={exploreClass} exploreMore={exploreMore} products={products} dropValue={dropdownSelected} handleDropdown={(e) => setDropdownSelected(e.target.value)} onClick={setGrid} gridClass={gridClass} listClass={listClass} />
    }

    function onSearchClick(value) {
        setActiveName(value)
    }

    function onCancelNameClick() {
        setActiveName("")
        if (query.get("name") != null) {
            history.push("/shop")
        }
    }

    function ShowSearchName() {
        if (activeName != "") {
            return <div ><div className="active-name">{activeName} <div className="cancel" onClick={() => { onCancelNameClick(); resetPageNumber() }}><BiX /></div></div></div>
        }
        return <div></div>
    }
    function ShowSearchColor() {
        if (activeColor != "") {
            return <div ><div className="active-name">{activeColor} <div className="cancel" onClick={() => { setActiveColor(""); resetPageNumber() }}><BiX /></div></div></div>
        }
        return <div></div>
    }
    function ShowSearchSize() {
        if (activeSize != "") {
            return <div ><div className="active-name">{activeSize} <div className="cancel" onClick={() => { setActiveSize(""); resetPageNumber() }}><BiX /></div></div></div>
        }
        return <div></div>
    }

    return (
        <div>
            <Header active={active} inputValue={activeName} onClick={onSearchClick} />
            <PageName pageName="SHOP" pageNav={<div>SHOP /<span style={{ fontWeight: 'bold', marginLeft: '1em' }}>ALL CATEGORIES</span></div>} />
            <div className="wrapper selected-filters">
                <ShowSearchName />
                <ShowSearchColor />
                <ShowSearchSize />
            </div>
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
                        resetPageNumber={resetPageNumber}
                        setMinPrice={setMinPrice}
                        setMaxPrice={setMaxPrice}
                    />
                    <SetView />
                </div>
            </div>
        </div>
    )
}

export default Shop;