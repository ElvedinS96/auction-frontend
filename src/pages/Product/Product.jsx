import React, { useEffect, useState } from "react";
import axios from "axios"
import "../../index.css"
import ProductDetails from "../../Components/Product/ProductDetails"
import { useParams } from "react-router-dom";


const Product = ({ ...props }) => {

    let { id } = useParams()
    let url = props.baseUrl + "/product"

    const [product, setProduct] = useState({
        name: "",
        description: "",
        price: null,
        endDate: null
    })

    useEffect(() => {
        url = url + "/" + id
        axios.get(url)
            .then(response => {
                var responseProduct = {
                    name: response.data.name,
                    description: response.data.description,
                    price: response.data.price,
                    endDate: response.data.endDate
                }
                setProduct(responseProduct)
            })
            .catch(error => {
                //TODO Show not found page
            })
    })

    return (
        <div>
            <ProductDetails product={product} />

        </div>
    );

}

export default Product;