import React, { useEffect } from "react";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import GeneralInformation from "../../Components/Seller/GeneralInformation";
import LocationAndShipping from "../../Components/Seller/LocationAndShipping";
import Pricing from "../../Components/Seller/Pricing";
import "../../index.css"
import Header from "../HeaderFooter/Header";
import PageName from "../HeaderFooter/PageName"
import axios from "axios"
import getUserFromToken from "../../Util/getUserFromToken";
import getToken from "../../Util/getToken";
import getMonths from "../../Util/getMonths";

const SellingWizard = props => {

    const history = useHistory()

    const [active, setActive] = useState({
        home: "nav-inactive",
        shop: "nav-inactive",
        account: "nav-active"
    })
    const [activeAccount, setActiveAccount] = useState({
        profile: "",
        seller: "my-account-active",
        bids: "",
        settings: ""
    })
    const [toUpdate, setToUpdate] = useState({
        user: false,
        address: false,
        cardInformation: false
    })

    const [selectedPhotos, setSelectedPhotos] = useState([])

    const [categories, setCategories] = useState([])
    const [categoryOptions, setCategoryOptions] = useState([])
    const [subcategoryOptions, setSubcategoryOptions] = useState([])
    const [countries, setCountries] = useState([])
    const [countryOptions, setCountryOptions] = useState([])
    const [cityOptions, setCityOptions] = useState([])
    const [monthOptions, setMonthOptions] = useState([])
    const [yearOptions, setYearOptions] = useState([])
    const [bearShipping, setBearShipping] = useState(false)
    const [currentStep, setCurrentStep] = useState(1)

    const [product, setProduct] = useState({
        name: "",
        categoryName: "",
        categoryId: 0,
        subcategoryName: "",
        subcategoryId: 0,
        description: "",
        images: [],
        price: 0,
        startDate: new Date(),
        endDate: new Date(),
    })
    const [productValidation, setProductValidation] = useState({
        name: "",
        category: "",
        subcategory: "",
        description: "",
        images: "",
        price: "",
        startDate: "",
        endDate: "",
    })

    const [userInfo, setUserInfo] = useState({})

    const [cardInfoValidation, setCardInfoValidation] = useState({
        nameOnCard: "",
        cardNumber: "",
        cardExpYear: "",
        cardExpMonth: "",
        cvc: ""
    })

    function handleProductChange(name, value) {
        setProduct(prevState => ({
            ...prevState,
            [name]: value
        })
        )
    }

    function handleUserInfoChange(name, value, toUpdate) {
        setUserInfo(prevState => ({
            ...prevState,
            [name]: value
        })
        )

        setToUpdate(prevState => ({
            ...prevState,
            [toUpdate]: true
        })
        )
    }

    useEffect(() => {
        //TODO call api for getting categories with subcategories
        var cat = [
            {
                id: 1,
                name: "Fashion",
                subcategories: [
                    {
                        id: 1,
                        name: "Jacket"
                    },
                    {
                        id: 2,
                        name: "Shirt"
                    }
                ]
            },
            {
                id: 2,
                name: "Electronic",
                subcategories: [
                    {
                        id: 3,
                        name: "Mobile"
                    },
                    {
                        id: 4,
                        name: "Tablet"
                    }
                ]
            },
            {
                id: 3,
                name: "Home",
                subcategories: [
                    {
                        id: 5,
                        name: "Table"
                    },
                    {
                        id: 6,
                        name: "Lamp"
                    }
                ]
            }
        ]
        setCategories(cat)
        setCategoryOptions(cat.map(category => ({ value: category.id, label: category.name })))

        var user = getUserFromToken()

        var url = props.baseUrl + "/user/" + user.id
        axios.get(url,
            {
                headers: {
                    Authorization: "Bearer " + getToken("token")
                }
            })
            .then(response => {
                const userDetails = response.data.userDetails
                const address = userDetails.address
                const cardInformation = userDetails.cardInformation
                setUserInfo({
                    userId: response.data.id,
                    userDetailsId: userDetails.id,
                    phoneNumber: userDetails.phoneNumber == null ? "" : userDetails.phoneNumber,
                    addressId: address.id,
                    street: address.street == null ? "" : address.street,
                    zipCode: address.zipCode == null ? "" : address.zipCode,
                    state: address.state == null ? "" : address.state,
                    cityId: address.city == null ? 0 : address.city.id,
                    city: address.city == null ? "" : address.city.name,
                    country: address.city == null ? "" : address.city.countryName,
                    cardId: cardInformation.id,
                    nameOnCard: cardInformation.nameOnCard == null ? "" : cardInformation.nameOnCard,
                    paypal: cardInformation.paypal == null ? false : cardInformation.paypal,
                    creditCard: cardInformation.creditCard == null ? false : cardInformation.creditCard,
                    cardNumber: cardInformation.cardNumber == null ? "" : cardInformation.cardNumber,
                    cardExpYear: cardInformation.yearExpiration == null ? "" : cardInformation.yearExpiration,
                    cardExpMonth: cardInformation.monthExpiration == null ? "" : cardInformation.monthExpiration,
                    cvc: cardInformation.cvc == null ? "" : cardInformation.cvc
                })
                url = props.baseUrl + "/country"
                axios.get(url,
                    {
                        headers: {
                            Authorization: "Bearer " + getToken("token")
                        }
                    })
                    .then(response => {
                        setCountries(response.data)
                        setCountryOptions(response.data.map(country => country.name))
                        if (address.city != null) {
                            setCityOptions(response.data.find(country => country.name == address.city.countryName).cities)
                        }
                    })
                    .catch(error => {
                        console.log(error)
                        history.push("/500")
                    })
            })
            .catch(error => {
                if (error.response.status == 403) {
                    document.cookie = "token=; path=/; max-age=-9999999;"
                    history.push("/login")
                }
                history.push("/500")
            })

        setMonthOptions(getMonths())
        setYearOptions(Array(2100 - 2020 + 1).fill().map((item, index) => 2020 + index))

    }, [])

    function onCategoryChange(value, label) {
        handleProductChange("categoryName", label)
        handleProductChange("categoryId", value)
        handleProductChange("subcategoryName", "")
        handleProductChange("subcategoryId", 0)
        const subcategories = categories.find(category => category.name == label).subcategories
        setSubcategoryOptions(subcategories.map(sub => ({ value: sub.id, label: sub.name })))
    }

    function onCountryChange(name, value, toUpdate) {
        handleUserInfoChange(name, value, toUpdate)
        handleUserInfoChange("city", "", toUpdate)
        setCityOptions(countries.find(country => country.name == value).cities)
    }

    function onNextClick() {
        var validation = true

        //TODO validate
        switch (currentStep) {
            case 1:
                break;
            case 2:
                break;
            case 3:
                break;
        }

        setCurrentStep(currentStep + 1)
    }

    function onBackClick() {
        setCurrentStep(currentStep - 1)
    }

    function onDoneClick() {
        //TODO final validation
        //TODO call api for adding product
        //Change user role to seller if he is first time seller
    }

    function ShowContent() {
        switch (currentStep) {
            case 1:
                return <GeneralInformation
                    product={product}
                    onChange={handleProductChange}
                    validation={productValidation}
                    categoryOptions={categoryOptions}
                    subcategoryOptions={subcategoryOptions}
                    onCategoryChange={onCategoryChange}
                    setSelectedPhotos={setSelectedPhotos}
                    onNextClick={onNextClick}
                />
                break;
            case 2:
                return <Pricing
                    product={product}
                    onChange={handleProductChange}
                    validation={productValidation}
                    onNextClick={onNextClick}
                    onBackClick={onBackClick}
                />
                break;
            case 3:
                return <LocationAndShipping
                    countryOptions={countryOptions}
                    cityOptions={cityOptions}
                    onCountryChange={onCountryChange}
                    monthOptions={monthOptions}
                    yearOptions={yearOptions}
                    bearShipping={bearShipping}
                    setBearShipping={setBearShipping}
                    userInfo={userInfo}
                    onChange={handleUserInfoChange}
                    validation={cardInfoValidation}
                    onBackClick={onBackClick}
                    onDoneClick={onDoneClick}
                />
                break;

        }
    }

    return (
        <div id="selling-wizard-global">
            <Header active={active} accountActive={activeAccount} />
            <PageName pageName="SELLING WIZARD" pageNav={<div>MY ACCOUNT /<span style={{ color: "#252525", marginLeft: '1em' }}>SELLING</span></div>} />
            {ShowContent()}
        </div >

    )
}

export default SellingWizard;