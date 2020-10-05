import React, { useEffect, useState } from "react";
import axios from "axios"
import "../../index.css"
import ProductDetails from "../../Components/Product/ProductDetails"
import ProductImages from "../../Components/Product/ProductImages"
import RelatedProducts from "../../Components/Product/RelatedProducts"
import { useParams } from "react-router-dom";


const Product = ({ ...props }) => {

    let { id } = useParams()
    let url = props.baseUrl + "/product"

    const [product, setProduct] = useState({
        name: "",
        description: "",
        price: null,
        endDate: null,
        urls: []
    })
    const [images, setImages] = useState([])

    const [relatedProducts, setRelatedProducts] = useState([])

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
                setImages(response.data.imagesUrl)

                axios.get(url + "/related?subcategory=" + response.data.subcategoryId)
                    .then(relatedResponse => {
                        setRelatedProducts(relatedResponse.data)
                    })
                    .catch(error => {
                        window.location.href = "/500"
                    })
            })
            .catch(error => {
                window.location.href = "/404"
            })
    }, [])

    return (
        <div>
            <div className="product">
                <ProductImages urls={images} />
                <ProductDetails product={product} />
            </div>
            <div>
                <RelatedProducts relatedProducts={relatedProducts} />
            </div>
        </div>
    );

}

export default Product;