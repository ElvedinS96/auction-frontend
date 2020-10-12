import React from "react"
import { useEffect } from "react";
import { useState } from "react";
import { useLocation } from "react-router-dom"
import axios from "axios"
import "../../index.css"
import LandingProducts from "../../Components/Home/LandingProducts";

const SearchResult = ({ ...props }) => {

    const query = useQueryy()
    const [products, setProducts] = useState([])

    function useQueryy() {
        return new URLSearchParams(useLocation().search);
    }

    useEffect(() => {
        if (props.products != null) {
            setProducts(props.products)
        }
        else {
            var url = props.baseUrl + "/product/category?category=" + query.get("category")
            axios.get(url)
                .then(response => {
                    setProducts(response.data)
                })
                .catch(error => {
                    window.location.href = "/500"
                })
        }

    }, [])

    return (

        <div className="search-result" >
            <LandingProducts products={products} heading="Search Result" hr={true} viewClass="landing-product" listClass="feature-products" />
        </div>
    );

}

export default SearchResult;