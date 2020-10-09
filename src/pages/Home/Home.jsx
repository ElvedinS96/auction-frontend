import React from "react";
import { useState, useEffect } from "react";
import axios from "axios"
import "../../index.css"
import "../../Components/Home/Category"
import Category from "../../Components/Home/Category";
import FeatureProduct from "../../Components/Home/FeatureProduct";
import FeatureCollection from "../../Components/Home/FeatureCollection";
import FeatureProducts from "../../Components/Home/FeatureProducts";

const Home = ({ ...props }) => {

    const [categories, setCategories] = useState([])
    const [featureCollections, setFeatureCollections] = useState([])
    const [feature, setFeature] = useState([])

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

    useEffect(() => {
        getCategories()
        getFeatureCollections()
        getFeatureProducts()

    }, [])

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
                <FeatureProducts products={feature} />
            </div>
        </div>

    )
}

export default Home;