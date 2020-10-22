import React, { useEffect, useState } from "react";
import axios from "axios"
import "../../index.css"
import ProductDetails from "../../Components/Product/ProductDetails"
import ProductImages from "../../Components/Product/ProductImages"
import RelatedProducts from "../../Components/Product/RelatedProducts"
import { useHistory, useParams } from "react-router-dom";
import PageName from "../HeaderFooter/PageName";
import tokenExists from "../../Util/tokenExists";
import StatusBar from "../../Components/StatusBar/StatusBar"
import Header from "../../pages/HeaderFooter/Header"
import BiddingTable from "../../Components/Product/BiddingTable";


const Product = ({ ...props }) => {

    let { id } = useParams()
    let url = props.baseUrl + "/product"
    let history = useHistory()

    const [product, setProduct] = useState({
        id: 0,
        name: "",
        description: "",
        price: null,
        endDate: null,
        urls: []
    })
    const [images, setImages] = useState([])
    const [relatedProducts, setRelatedProducts] = useState([])
    const [statusMessage, setStatusMessage] = useState("")
    const [statusClass, setSatusClass] = useState("")
    const [bid, setBid] = useState(0)

    useEffect(() => {
        url = url + "/" + id
        axios.get(url)
            .then(response => {
                var responseProduct = {
                    id: response.data.id,
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
                alert(error)
                window.location.href = "/404"
            })
    }, [])

    function handleBidClick(product) {
        if (tokenExists()) {
            //TODO BIDDING
            alert(bid)
            window.location.reload()
        }
        else {
            history.push("/login")
        }
    }

    function ProductBottom() {
        if (tokenExists()) {
            return <BiddingTable />
        }
        else {
            return <RelatedProducts relatedProducts={relatedProducts} viewClass="landing-product" />
        }
    }

    return (
        <div>
            <Header />
            <PageName pageName="SINGLE PRODUCT" pageNav="SHOP / SINGLE PRODUCT" />
            <StatusBar statusMessage={statusMessage} className={statusClass} />
            <div className="product">
                <ProductImages urls={images} />
                <ProductDetails product={product} onClick={() => handleBidClick(product)} inputOnChange={(e) => setBid(e.target.value)} />
            </div>
            <div>
                <ProductBottom />
            </div>
        </div>
    );

}

export default Product;