import React from "react";
import { useState, useEffect } from "react";
import axios from "axios"
import "../../index.css"
import "../../Components/Home/Category"
import Category from "../../Components/Home/Category";
import FeatureProduct from "../../Components/Home/FeatureProduct";
import FeatureCollection from "../../Components/Home/FeatureCollection";
import LandingProducts from "../../Components/Home/LandingProducts";

const Home = ({ ...props }) => {

    const [categories, setCategories] = useState([])
    const [featureCollections, setFeatureCollections] = useState([])
    const [feature, setFeature] = useState([])
    const [newArrivals, setNewArrivals] = useState([])
    const [topRated, setTopRated] = useState([])
    const [lastChance, setLastChance] = useState([])
    const [showProducts, setShowProducts] = useState([])

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
        var url = props.baseUrl + "/product/feature-collections"
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

    useEffect(() => {
        getCategories()
        getFeatureCollections()
        getFeatureProducts()
        getNewArrivals()
        getTopRated()
        getLastChance()
        onClick("new-arrivals")
    }, [], showProducts)

    return (
        <div className="home">
            <div className="home-top">
                <Category categories={categories} />
                <FeatureProduct />
            </div>
            <div className="feature-collection">
                <FeatureCollection collections={featureCollections} />
            </div>
            <div>
                <LandingProducts products={feature} heading="Feature products" hr={true} viewClass="landing-product" listClass="feature-products" />
                <div className="feature-products">
                    <div className="home-nav">
                        <button autoFocus onClick={() => onClick("new-arrivals")} >New Arrivals</button>
                        <button onClick={() => onClick("top-rated")}>Top Rated</button>
                        <button onClick={() => onClick("last-chance")}> Last Chance</button>
                    </div>
                    <LandingProducts products={showProducts} heading="" hr={false} viewClass="landing-product" listClass="arrivals" />
                </div >

            </div>
        </div>

    )
}

export default Home;