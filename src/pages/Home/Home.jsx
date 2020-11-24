import React from "react";
import { useState, useEffect } from "react";
import axios from "axios"
import "../../index.css"
import "../../Components/Home/Category"
import Category from "../../Components/Home/Category";
import FeatureProduct from "../../Components/Home/FeatureProduct";
import FeatureCollection from "../../Components/Home/FeatureCollection";
import LandingProducts from "../../Components/Home/LandingProducts";
import Header from "../HeaderFooter/Header";

const Home = ({ ...props }) => {

    const [categories, setCategories] = useState([])
    const [featureCollections, setFeatureCollections] = useState([])
    const [feature, setFeature] = useState([])
    const [newArrivals, setNewArrivals] = useState([])
    const [topRated, setTopRated] = useState([])
    const [lastChance, setLastChance] = useState([])
    const [showProducts, setShowProducts] = useState([])
    const [featureProduct, setFeatureProduct] = useState({
        name: "",
        description: "",
        price: "",
        image: ""
    })
    const [active, setActive] = useState({
        home: "nav-active",
        shop: "nav-inactive",
        account: "nav-inactive"
    })

    function onClick(name) {
        switch (name) {
            case "new-arrivals":
                setShowProducts(newArrivals)
                break;
            case "top-rated":
                setShowProducts(topRated)
                break;
            case "last-chance":
                setShowProducts(lastChance)
                break;
        }
    }


    function getCategories() {
        var url = props.baseUrl + "/category"
        axios.get(url)
            .then(response => {
                setCategories(response.data)
            })
            .catch(error => {
                window.location.href = "/500"
            })
    }

    function getFeatureCollections() {
        var url = props.baseUrl + "/category/feature"
        axios.get(url)
            .then(response => {
                setFeatureCollections(response.data)
            })
            .catch(error => {
                window.location.href = "/500"
            })
    }

    function getFeatureProducts() {
        var url = props.baseUrl + "/product/feature"
        axios.get(url)
            .then(response => {
                setFeature(response.data)
                var featureProduct = {
                    id: response.data[0].id,
                    name: response.data[0].name,
                    description: response.data[0].description,
                    price: response.data[0].price,
                    image: response.data[0].imagesUrl[0]
                }
                setFeatureProduct(featureProduct)
            })
            .catch(error => {
                window.location.href = "/500"
            })
    }

    function getNewArrivals() {
        var url = props.baseUrl + "/product/new-arrivals"
        axios.get(url)
            .then(response => {
                setNewArrivals(response.data)
                setShowProducts(response.data)
            })
            .catch(error => {
                window.location.href = "/500"
            })
    }

    function getTopRated() {
        var url = props.baseUrl + "/product/top-rated"
        axios.get(url)
            .then(response => {
                setTopRated(response.data)
            })
            .catch(error => {
                window.location.href = "/500"
            })
    }

    function getLastChance() {
        var url = props.baseUrl + "/product/last-chance"
        axios.get(url)
            .then(response => {
                setLastChance(response.data)
            })
            .catch(error => {
                window.location.href = "/500"
            })
    }

    function handleBidNowClick(id) {
        window.location.href = "/product/" + id
    }

    useEffect(() => {
        window.scrollTo(0, 0)
        getCategories()
        getFeatureCollections()
        getFeatureProducts()
        getNewArrivals()
        getTopRated()
        getLastChance()
        onClick("new-arrivals")
    }, [], showProducts)

    return (
        <div>
            <Header active={active} />
            <div id="home" className="home">
                <div id="home-top" className="home-top">
                    <div className="home-top-inside">
                        <Category categories={categories} />
                        <FeatureProduct product={featureProduct} onClick={() => handleBidNowClick(featureProduct.id)} />
                    </div>
                </div>
                <div id="home-feature-collection" className="feature-collection">
                    <FeatureCollection collections={featureCollections} product={featureProduct} />
                </div>
                <div>
                    <LandingProducts products={feature} heading="Feature Products" hr={true} viewClass="landing-product" listClass="feature-products" />
                    <div id="home-other-collections" className="feature-products">
                        <div id="home-collections-nav" className="home-nav">
                            <button id="home-nav-new-arrivals" autoFocus onClick={() => onClick("new-arrivals")} >New Arrivals</button>
                            <button id="home-nav-top-rated" onClick={() => onClick("top-rated")}>Top Rated</button>
                            <button id="home-nav-last-chance" onClick={() => onClick("last-chance")}> Last Chance</button>
                        </div>
                        <LandingProducts products={showProducts} heading="" hr={false} viewClass="landing-product" listClass="arrivals" />
                    </div >

                </div>
            </div>

        </div>

    )
}

export default Home;