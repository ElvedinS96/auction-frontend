import React from "react"
import { useEffect } from "react";
import { useState } from "react";
import { useLocation } from "react-router-dom"
import axios from "axios"
import "../../index.css"
import LandingProducts from "../../Components/Home/LandingProducts";
import PageName from "../HeaderFooter/PageName";
import Header from "../HeaderFooter/Header";

const SearchResult = ({ ...props }) => {

    const query = useQueryy()
    const [products, setProducts] = useState([])
    const [active, setActive] = useState({
        home: "nav-inactive",
        shop: "nav-active",
        account: "nav-inactive"
    })

    function useQueryy() {
        return new URLSearchParams(useLocation().search);
    }

    useEffect(() => {
        if (props.products != null) {
            setProducts(props.products)
        }
        else {
            var url = props.baseUrl + "/product/category?category=" + query.get("category") + "&feature=" + query.get("feature")
            axios.get(url)
                .then(response => {
                    setProducts(response.data)
                })
                .catch(error => {
                    window.location.href = "/500"
                })
        }

    }, [])

    function Products() {
        if (products.length == 0) {
            return <div className="info-message">No available products for this search</div>
        }
        else {
            return <LandingProducts products={products} heading="Search Result" hr={true} viewClass="landing-product" listClass="feature-products" />
        }
    }


    return (

        <div className="search-result" >
            <Header active={active} />
            <PageName pageName="SEARCH RESULT" />
            <Products />
        </div>
    );

}

export default SearchResult;