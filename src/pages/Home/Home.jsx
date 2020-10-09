import React from "react";
import { useState, useEffect } from "react";
import axios from "axios"
import "../../index.css"
import "../../Components/Home/Category"
import Category from "../../Components/Home/Category";
import FeatureProduct from "../../Components/Home/FeatureProduct";

const Home = ({ ...props }) => {

    const [categories, setCategories] = useState([])

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

    useEffect(() => {
        getCategories()

    }, [])

    return (
        <div className="home">
            <div className="home-top">
                <Category categories={categories} />
                <FeatureProduct />
            </div>
        </div>

    )
}

export default Home;