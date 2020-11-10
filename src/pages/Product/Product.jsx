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
import getUserFromToken from "../../Util/getUserFromToken";
import getToken from "../../Util/getToken";


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
    const [bid, setBid] = useState(0)
    const [highestBid, setHighestBid] = useState(0)
    const [productBids, setProductBids] = useState([])
    const [numberOfBids, setNumberOfBids] = useState(0)
    const [active, setActive] = useState({
        home: "nav-inactive",
        shop: "nav-active",
        account: "nav-inactive"
    })

    useEffect(() => {
        localStorage.statusMessage = ""
        localStorage.statusClass = ""
        url = url + "/" + id
        axios.get(url)
            .then(response => {
                var highestBid = response.data.price
                if (response.data.bids.length != 0) {
                    highestBid = Math.max.apply(Math, response.data.bids.map(bid => bid.bidAmount))
                }
                setHighestBid(highestBid)
                setProductBids(response.data.bids)
                setNumberOfBids(response.data.bids.length)
                var responseProduct = {
                    id: response.data.id,
                    name: response.data.name,
                    description: response.data.description,
                    price: response.data.price,
                    endDate: new Date(response.data.auctionEndDate)
                }
                localStorage.productId = response.data.id
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

    function handleBidClick(product) {
        if (tokenExists()) {
            if (bid <= highestBid) {
                localStorage.statusMessage = "There are higher bids than yours. You could give a second try!"
                localStorage.statusClass = "status status-info"
            }
            else {
                const bidUrl = props.baseUrl + "/bid"
                const loggedUser = getUserFromToken()
                const req = {
                    userId: loggedUser.id,
                    productId: product.id,
                    bidTime: Date.now(),
                    bidAmount: bid
                }

                axios.post(bidUrl, req,
                    {
                        headers: {
                            Authorization: "Bearer " + getToken("token")
                        }
                    })
                    .then(response => {
                        localStorage.statusMessage = "Congrats! You are the highest bidder!"
                        localStorage.statusClass = "status status-success"
                        setHighestBid(response.data.bidAmount)
                        setNumberOfBids(numberOfBids + 1)
                        var bids = productBids;
                        bids.push(response.data)
                        setProductBids(bids)
                        localStorage.userBid = bid
                    })
                    .catch(error => {
                        window.location.href = "/login"
                    })
            }
        }
        else {
            history.push("/login")
        }
    }

    function ProductBottom() {
        if (tokenExists()) {
            return <BiddingTable baseUrl={props.baseUrl} bidders={productBids} />
        }
        else {
            return <RelatedProducts relatedProducts={relatedProducts} viewClass="landing-product" />
        }
    }

    return (
        <div>
            <Header active={active} />
            <PageName pageName="SINGLE PRODUCT" pageNav={<div>SHOP /<span style={{ fontWeight: 'bold', marginLeft: '1em' }}>SINGLE PRODUCT</span></div>} />
            <StatusBar statusMessage={localStorage.statusMessage} className={localStorage.statusClass} />
            <div className="product">
                <ProductImages urls={images} />
                <ProductDetails
                    baseUrl={props.baseUrl}
                    product={product}
                    highestBid={highestBid}
                    bids={productBids}
                    numberOfBids={numberOfBids}
                    onClick={() => handleBidClick(product)}
                    inputOnChange={(e) => setBid(e.target.value)}
                />
            </div>
            <div>
                <ProductBottom />
            </div>
        </div>
    );

}

export default Product;