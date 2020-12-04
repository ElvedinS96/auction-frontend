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
import ProgressBar from "./ProgressBar";
import { validateCardExpiration, validateCardNumber, validateCity, validateCountry, validateCVC, validateFirstName, validateNameOnCard, validateNumber, validateProductName, validateStreet, validateZipCode } from "../../Util/Validation";

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
    const [colorOptions, setColorOptions] = useState([])
    const [sizeOptions, setSizeOptions] = useState([])
    const [countries, setCountries] = useState([])
    const [countryOptions, setCountryOptions] = useState([])
    const [cityOptions, setCityOptions] = useState([])
    const [monthOptions, setMonthOptions] = useState([])
    const [yearOptions, setYearOptions] = useState([])
    const [bearShipping, setBearShipping] = useState(false)
    const [featureProduct, setFeatureProduct] = useState(false)
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
        color: "",
        size: ""
    })
    const [userInfo, setUserInfo] = useState({})

    const [productGeneralValidation, setProductGeneralValidation] = useState({
        name: "",
        category: "",
        subcategory: "",
        description: "",
        images: "",
        color: "",
        size: ""
    })
    const [productPriceValidation, setProductPriceValidation] = useState({
        price: "",
        startDate: "",
        endDate: ""
    })
    const [addressValidation, setAddressValidation] = useState({
        street: "",
        country: "",
        city: "",
        zipCode: "",
        phoneNumber: ""
    })
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
        window.scrollTo(0, 0)

        var url = props.baseUrl + "/category"
        axios.get(url)
            .then(response => {
                setCategories(response.data)
                setCategoryOptions(response.data.map(category => ({ value: category.id, label: category.name })))
            })
            .catch(error => {
                history.push("/500")
            })

        url = props.baseUrl + "/shop/filters"
        axios.get(url)
            .then(response => {
                setColorOptions(response.data.colors)
                setSizeOptions(response.data.sizes)
            })
            .catch(error => {
                history.push("/500")
            })

        var user = getUserFromToken()

        url = props.baseUrl + "/user/" + user.id
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
                    userRegister: response.data.userRegister,
                    userDetailsId: userDetails.id,
                    gender: userDetails.gender == "" ? "Other" : userDetails.gender,
                    birthDate: userDetails.birthDate,
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

    function validateGeneral() {
        var isValid = true
        var validationMessage = {
            name: "",
            category: "",
            subcategory: "",
            description: "",
            images: "",
            color: "",
            size: ""
        }

        var productName = validateProductName(product.name)
        if (!productName.valid) {
            validationMessage.name = productName.message
            isValid = false
        }

        if (product.categoryId == 0) {
            validationMessage.category = "Category is required"
            isValid = false
        }

        if (product.subcategoryId == 0) {
            validationMessage.subcategory = "Subcategory is required"
            isValid = false
        }

        if (product.description.length > 700) {
            validationMessage.description = "Description is too long"
            isValid = false
        }

        if (selectedPhotos.length < 3) {
            validationMessage.images = "Select at least 3 photos"
            isValid = false
        }

        if (product.color == "") {
            validationMessage.color = "Color is required"
            isValid = false
        }

        if (product.size == "") {
            validationMessage.size = "Size is required"
            isValid = false
        }

        setProductGeneralValidation(validationMessage)
        return isValid

    }

    function validatePricing() {
        var isValid = true
        var validatinMessage = {
            price: "",
            startDate: "",
            endDate: ""
        }

        if (product.price.length == 0 || product.price < 0) {
            validatinMessage.price = "Price must be greater than 0"
            isValid = false
        }

        if (product.startDate < new Date()) {
            validatinMessage.startDate = "Start date must be in future"
            isValid = false
        }

        if (product.endDate < product.startDate) {
            validatinMessage.endDate = "End date must be after start date"
            isValid = false
        }

        setProductPriceValidation(validatinMessage)
        return isValid
    }

    function validateAddress() {
        var isValid = true
        var validationMessage = {
            street: "",
            zipCode: "",
            country: "",
            city: "",
            phoneNumber: ""
        }

        var streetValidation = validateStreet(userInfo.street)
        if (!streetValidation.valid) {
            validationMessage.street = streetValidation.message
            isValid = false;
        }

        var zipCodeValidation = validateZipCode(userInfo.zipCode)
        if (!zipCodeValidation.valid) {
            validationMessage.zipCode = zipCodeValidation.message
            isValid = false;
        }

        var countryValidation = validateCountry(userInfo.country)
        if (!countryValidation.valid) {
            validationMessage.country = countryValidation.message
            isValid = false;
        }

        var cityValidation = validateCity(userInfo.city)
        if (!cityValidation.valid) {
            validationMessage.city = cityValidation.message
            isValid = false;
        }

        var numberValidation = validateNumber(userInfo.phoneNumber)
        if (!numberValidation.valid) {
            validationMessage.phoneNumber = numberValidation.message
            isValid = false;
        }

        setAddressValidation(validationMessage)
        return isValid
    }

    function validateCardInfo() {
        var isValid = true
        var validationMessage = {
            nameOnCard: "",
            cardNumber: "",
            cardExpYear: "",
            cardExpMonth: "",
            cvc: ""
        }

        var nameOnCardValidation = validateNameOnCard(userInfo.nameOnCard)
        if (!nameOnCardValidation.valid) {
            validationMessage.nameOnCard = nameOnCardValidation.message
            isValid = false;
        }

        var cardNumberValidation = validateCardNumber(userInfo.cardNumber)
        if (!cardNumberValidation.valid) {
            validationMessage.cardNumber = cardNumberValidation.message
            isValid = false;
        }

        var expirationValidation = validateCardExpiration(userInfo.cardExpYear, userInfo.cardExpMonth)
        if (!expirationValidation.valid) {
            validationMessage.cardExpMonth = expirationValidation.messageMonth
            validationMessage.cardExpYear = expirationValidation.messageYear
            isValid = false;
        }

        var cvcValidation = validateCVC(userInfo.cvc)
        if (!cvcValidation.valid) {
            validationMessage.cvc = cvcValidation.message
            isValid = false;
        }

        setCardInfoValidation(validationMessage)
        return isValid
    }

    function onNextClick() {

        switch (currentStep) {
            case 1:
                if (!validateGeneral()) {
                    return false
                }
                break;
            case 2:
                if (!validatePricing()) {
                    return false
                }
                break;
        }

        setCurrentStep(currentStep + 1)
    }

    function onBackClick() {
        setCurrentStep(currentStep - 1)
    }

    function UpdateUserData() {
        if (toUpdate.user) {
            const request = {
                id: userInfo.userId,
                userRegister: userInfo.userRegister,
                userDetails: {
                    id: userInfo.userDetailsId,
                    phoneNumber: userInfo.phoneNumber,
                    birthDate: userInfo.birthDate,
                    gender: userInfo.gender,
                    address: {
                        id: userInfo.addressId
                    },
                    cardInformation: {
                        id: userInfo.cardId
                    }
                }
            }

            var url = props.baseUrl + "/user"
            axios.put(url, request,
                {
                    headers: {
                        Authorization: "Bearer " + getToken("token")
                    }
                })
                .then(response => {
                })
                .catch(error => {
                    console.log(error)
                })
        }
        console.log(userInfo)
        alert(toUpdate.address)
        if (toUpdate.address) {

            var request = {
                id: userInfo.addressId,
                street: userInfo.street,
                state: userInfo.state,
                zipCode: userInfo.zipCode,
                city: {
                    name: userInfo.city
                }
            }

            var url = props.baseUrl + "/user/address"
            axios.put(url, request,
                {
                    headers: {
                        Authorization: "Bearer " + getToken("token")
                    }
                })
                .then(response => {
                })
                .catch(error => {
                    console.log(error)
                })

        }

        if (toUpdate.cardInformation) {

            var request = {
                id: userInfo.cardId,
                nameOnCard: userInfo.nameOnCard,
                cardNumber: userInfo.cardNumber,
                yearExpiration: userInfo.cardExpYear,
                monthExpiration: userInfo.cardExpMonth,
                cvc: userInfo.cvc,
                paypal: userInfo.paypal,
                creditCard: userInfo.creditCard
            }

            var url = props.baseUrl + "/user/card-info"
            axios.put(url, request,
                {
                    headers: {
                        Authorization: "Bearer " + getToken("token")
                    }
                })
                .then(response => {
                })
                .catch(error => {
                    console.log(error)
                })
        }
    }

    function onDoneClick() {
        var validAddress = true;
        var validCard = true;
        validAddress = validateAddress()

        if (bearShipping || featureProduct) {
            validCard = validateCardInfo()
        }

        if (validAddress && validCard) {
            //TODO call api for adding product
            //Change user role to seller if he is first time seller

            UpdateUserData()

            localStorage.createdId = 1
            localStorage.createdName = "Android Tablet"
            localStorage.createdImage = "https://www.android.com/static/2016/img/devices/tablets/transparent/sony-xperia-z4_1x.png"
            history.push("/selling-done")
        }
    }

    function ShowContent() {
        switch (currentStep) {
            case 1:
                return <GeneralInformation
                    product={product}
                    onChange={handleProductChange}
                    validation={productGeneralValidation}
                    categoryOptions={categoryOptions}
                    subcategoryOptions={subcategoryOptions}
                    onCategoryChange={onCategoryChange}
                    setSelectedPhotos={setSelectedPhotos}
                    onNextClick={onNextClick}
                    colorOptions={colorOptions}
                    sizeOptions={sizeOptions}
                />
                break;
            case 2:
                return <Pricing
                    product={product}
                    onChange={handleProductChange}
                    validation={productPriceValidation}
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
                    validation={addressValidation}
                    cardValidation={cardInfoValidation}
                    onBackClick={onBackClick}
                    onDoneClick={onDoneClick}
                    featureProduct={featureProduct}
                    setFeatureProduct={setFeatureProduct}
                />
                break;

        }
    }

    return (
        <div id="selling-wizard-global">
            <Header active={active} accountActive={activeAccount} />
            <PageName pageName="SELLING WIZARD" pageNav={<div>MY ACCOUNT /<span style={{ color: "#252525", marginLeft: '1em' }}>SELLING</span></div>} />
            <ProgressBar step={currentStep} />
            {ShowContent()}
        </div >

    )
}

export default SellingWizard;