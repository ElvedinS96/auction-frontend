import React from "react";
import { useState } from "react";
import Profile from "../../Components/UserProfile/Profile";
import UserBids from "../../Components/UserProfile/UserBids";
import Settings from "../../Components/UserProfile/Settings";
import UserProfileHeader from "../../Components/UserProfile/UserProfileHeader";
import "../../index.css"
import Header from "../HeaderFooter/Header";
import { useEffect } from "react";
import getMonths from "../../Util/getMonths";
import axios from "axios"
import getUserFromToken from "../../Util/getUserFromToken"
import { storage } from "../../firebase"
import { validateEmpty, validateFirstName, validateLastName, validateEmail, validateNumber, validateOnlyLettersAndNumbers, validateState, validateCardNumber, validateCVC, validateCardExpiration, validateBirthDate, validateStreet, validateZipCode, validateOnlyLetters, validateCity, validateCountry, validateNameOnCard } from "../../Util/Validation"
import getToken from "../../Util/getToken";
import { useHistory, useLocation } from "react-router-dom";
import PageName from "../HeaderFooter/PageName";
import StatusBar from "../../Components/StatusBar/StatusBar"
import { useRef } from "react";

const User = props => {

    const history = useHistory()

    const personalRef = useRef(null)
    const cardInfoRef = useRef(null)
    const addressRef = useRef(null)

    function useQuery() {
        return new URLSearchParams(useLocation().search);
    }

    const query = useQuery()

    const [statusMessage, setStatusMessage] = useState("")
    const [statusStyle, setStatusStyle] = useState("")
    const [active, setActive] = useState({
        home: "nav-inactive",
        shop: "nav-inactive",
        account: "nav-active"
    })
    const [activeAccount, setActiveAccount] = useState({
        profile: "",
        bids: "",
        settings: ""
    })
    const headerActiveClass = "nav-profile-button-active"
    const [profileHeaderActive, setProfileHeaderActive] = useState("profile")
    const [headerClasses, setHeaderClasses] = useState({
        profile: headerActiveClass,
        bids: "",
        settings: ""
    })
    const [selectedPage, setSelectedPage] = useState("PROFILE")
    const [userBids, setUserBids] = useState([{
        productId: 0,
        name: "",
        auctionEndDate: "",
        userBid: 0,
        highestBid: 0,
        numberOfBids: 0,
        imgUrl: ""
    }])

    const [genderOptions, setGenderOptions] = useState(["Male", "Female", "Other"])
    const [monthOptions, setMonthOptions] = useState([])
    const [yearOptions, setYearOptions] = useState([])
    const [dayOptions, setDayOptions] = useState([])
    const [countries, setCountries] = useState([])
    const [countryOptions, setCountryOptions] = useState([])
    const [cityOptions, setCityOptions] = useState([])

    const [userInfo, setUserInfo] = useState({})
    const [toUpdate, setToUpdate] = useState({
        user: false,
        address: false,
        cardInformation: false
    })

    const [addressValidation, setAddressValidation] = useState({
        street: "",
        zipCode: "",
        state: "",
        country: "",
        city: ""
    })

    const [cardInfoValidation, setCardInfoValidation] = useState({
        nameOnCard: "",
        cardNumber: "",
        cardExpYear: "",
        cardExpMonth: "",
        cvc: ""
    })

    const [userValidation, setUserValidation] = useState(
        {
            firstName: "",
            lastName: "",
            birthdate: "",
            phoneNumber: "",
            email: "",
            gender: ""
        }
    )

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

        localStorage.statusMessage = ""
        localStorage.statusClass = ""

        var tab = query.get("tab")
        if (tab != null) {
            onHeaderClick(tab)
        }

        var user = getUserFromToken()

        var url = props.baseUrl + "/user/" + user.id + "/bids"
        axios.get(url,
            {
                headers: {
                    Authorization: "Bearer " + getToken("token")
                }
            })
            .then(response => {
                setUserBids(response.data)
            })
            .catch(error => {
                console.log(error)
                history.push("/500")
            })

        setMonthOptions(getMonths())
        setYearOptions(Array(2100 - 1900 + 1).fill().map((item, index) => 1900 + index))
        setDayOptions(Array(31 - 1 + 1).fill().map((item, index) => 1 + index))

        url = props.baseUrl + "/user/" + user.id
        axios.get(url,
            {
                headers: {
                    Authorization: "Bearer " + getToken("token")
                }
            })
            .then(response => {
                const dateOfBirth = new Date(response.data.userDetails.birthDate)
                const month = getMonths().find(month => month.value == (dateOfBirth.getMonth() + 1)).label
                const userRegister = response.data.userRegister
                const userDetails = response.data.userDetails
                const address = userDetails.address
                const cardInformation = userDetails.cardInformation
                setUserInfo({
                    userId: response.data.id,
                    userRegisterId: userRegister.id,
                    firstName: userRegister.firstName,
                    lastName: userRegister.lastName,
                    email: userRegister.email,
                    imageUrl: userRegister.imageUrl,
                    userDetailsId: userDetails.id,
                    gender: userDetails.gender == "" ? "" : userDetails.gender,
                    birthDay: dateOfBirth.getDate().toString(),
                    birthMonth: month,
                    birthYear: dateOfBirth.getFullYear().toString(),
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
                console.log(error)
                history.push("/500")
            })

    }, [])

    function onHeaderClick(activeButton) {
        switch (activeButton) {
            case "profile":
                setProfileHeaderActive("profile")
                setSelectedPage("PROFILE")
                setHeaderClasses({ profile: headerActiveClass, bids: "", settings: "" })
                setActiveAccount({ profile: "my-account-active", bids: "", settings: "" })
                break;
            case "bids":
                setProfileHeaderActive("bids")
                setSelectedPage("BIDS")
                setHeaderClasses({ profile: "", bids: headerActiveClass, settings: "" })
                setActiveAccount({ profile: "", bids: "my-account-active", settings: "" })
                break;
            case "settings":
                setProfileHeaderActive("settings")
                setSelectedPage("SETTINGS")
                setHeaderClasses({ profile: "", bids: "", settings: headerActiveClass })
                setActiveAccount({ profile: "", bids: "", settings: "my-account-active" })
                break;
        }
    }

    function validateAddress() {
        var isValid = true
        var validationMessage = {
            street: "",
            zipCode: "",
            state: "",
            country: "",
            city: ""
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

        var stateValidation = validateState(userInfo.state)
        if (!stateValidation.valid) {
            validationMessage.state = stateValidation.message
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

    function validateUserData() {
        var isValid = true
        var validationMessage = {
            firstName: "",
            lastName: "",
            birthdate: "",
            phoneNumber: "",
            email: "",
            gender: ""
        }

        var firstNameValidation = validateFirstName(userInfo.firstName)
        if (!firstNameValidation.valid) {
            validationMessage.firstName = firstNameValidation.message
            isValid = false;
        }

        var lastNameValidation = validateLastName(userInfo.lastName)
        if (!lastNameValidation.valid) {
            validationMessage.lastName = lastNameValidation.message
            isValid = false;
        }

        var emailValidation = validateEmail(userInfo.email)
        if (!emailValidation.valid) {
            validationMessage.email = emailValidation.message
            isValid = false;
        }

        var numberValidation = validateNumber(userInfo.phoneNumber)
        if (!numberValidation.valid) {
            validationMessage.phoneNumber = numberValidation.message
            isValid = false;
        }

        var birthDateValidation = validateBirthDate(userInfo.birthYear, userInfo.birthMonth, userInfo.birthDay)
        if (!birthDateValidation.valid) {
            validationMessage.birthdate = birthDateValidation.message
            isValid = false
        }

        var genderValidation = validateEmpty(userInfo.gender, "Gender")
        if (!genderValidation.valid) {
            validationMessage.gender = genderValidation.message
            isValid = false
        }

        setUserValidation(validationMessage)
        return isValid
    }

    function validate() {
        var validation = {
            valid: true,
            user: true,
            address: true,
            cardInfo: true
        }

        if (toUpdate.user) {
            var valid = validateUserData()
            if (!valid) {
                validation.valid = false
                validation.user = false
            }
        }

        if (toUpdate.address) {
            var valid = validateAddress()
            if (!valid) {
                validation.valid = false
                validation.address = false
            }
        }

        if (toUpdate.cardInformation) {
            var valid = validateCardInfo()
            if (!valid) {
                validation.valid = false
                validation.cardInfo = false
            }
        }

        return validation
    }

    function saveInfo() {

        var validation = validate()
        if (validation.valid) {
            if (toUpdate.user) {

                var yearBirth = parseInt(userInfo.birthYear)
                var dayBirth = parseInt(userInfo.birthDay)
                var monthBirth = getMonths().find(m => m.label == userInfo.birthMonth).value


                const request = {
                    id: userInfo.userId,
                    userRegister: {
                        id: userInfo.userRegisterId,
                        firstName: userInfo.firstName,
                        lastName: userInfo.lastName,
                        email: userInfo.email,
                        imageUrl: userInfo.imageUrl
                    },
                    userDetails: {
                        id: userInfo.userDetailsId,
                        phoneNumber: userInfo.phoneNumber,
                        birthDate: new Date(yearBirth, monthBirth - 1, dayBirth).getTime(),
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
                        setStatusMessage("Data saved successfully")
                        setStatusStyle("status status-success")
                        window.scrollTo({
                            top: 0,
                            left: 0,
                            behavior: "smooth"
                        })
                    })
                    .catch(error => {
                        console.log(error)
                    })
            }

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
                        setStatusMessage("Data saved successfully")
                        setStatusStyle("status status-success")
                        window.scrollTo({
                            top: 0,
                            left: 0,
                            behavior: "smooth"
                        })
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
                        setStatusMessage("Data saved successfully")
                        setStatusStyle("status status-success")
                        window.scrollTo({
                            top: 0,
                            left: 0,
                            behavior: "smooth"
                        })
                    })
                    .catch(error => {
                        console.log(error)
                    })
            }
        }
        else {
            setStatusStyle("")
            setStatusMessage("")
            if (!validation.user) {
                window.scrollTo({
                    top: personalRef.current.offsetTop,
                    left: 0,
                    behavior: "smooth"
                })
            }
            else if (!validation.address) {
                window.scrollTo({
                    top: addressRef.current.offsetTop,
                    left: 0,
                    behavior: "smooth"
                })
            }
            if (!validation.cardInfo) {
                window.scrollTo({
                    top: cardInfoRef.current.offsetTop,
                    left: 0,
                    behavior: "smooth"
                })
            }
        }


    }

    function changeImage(e) {
        if (e.target.files[0]) {
            const image = e.target.files[0]
            const uploadTask = storage.ref(`profile_images/${image.name}`).put(image);
            uploadTask.on(
                "state_changed",
                snapshot => { },
                error => {
                    console.log(error);
                },
                () => {
                    storage
                        .ref("profile_images")
                        .child(image.name)
                        .getDownloadURL()
                        .then(url => {
                            handleUserInfoChange("imageUrl", url, "user")
                        });
                }
            );
        }
    }

    function onCountryChange(name, value) {
        handleUserInfoChange(name, value)
        handleUserInfoChange("city", "")
        setCityOptions(countries.find(country => country.name == value).cities)
    }

    function SetSection() {
        if (profileHeaderActive == "profile") {
            return <Profile
                genderOptions={genderOptions}

                monthOptions={monthOptions}
                yearOptions={yearOptions}
                dayOptions={dayOptions}
                countryOptions={countryOptions}
                cityOptions={cityOptions}

                onChange={handleUserInfoChange}
                userInfo={userInfo}
                saveInfo={saveInfo}
                changeImage={changeImage}
                onCountryChange={onCountryChange}

                addressValidation={addressValidation}
                cardInfoValidation={cardInfoValidation}
                userValidation={userValidation}

                personalRef={personalRef}
                addressRef={addressRef}
                cardInfoRef={cardInfoRef}
            />
        }
        else if (profileHeaderActive == "bids") {
            return <UserBids bids={userBids} />
        }
        else if (profileHeaderActive == "settings") {
            return <Settings
                email={userInfo.email}
                phone={userInfo.phoneNumber}
            />
        }
        return <div></div>
    }


    return (
        <div>
            <Header active={active} accountActive={activeAccount} />
            <PageName pageName="MY ACCOUNT" pageNav={<div>MY ACCOUNT /<span style={{ color: "#252525", marginLeft: '1em' }}>{selectedPage}</span></div>} />
            <StatusBar statusMessage={statusMessage} href="" refText="" className={statusStyle} />
            <div id="user-page" className="wrapper">
                <UserProfileHeader setActive={onHeaderClick} classes={headerClasses} />
                {SetSection()}
            </div>
        </div>
    )
}

export default User;