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
import { storage } from "../../firebase"
import { validateFirstName, validateLastName, validateEmail, validateNumber, validateOnlyLettersAndNumbers, validateState, validateCardNumber, validateCVC, validateCardExpiration, validateBirthDate } from "../../Util/Validation"

const User = props => {

    const [active, setActive] = useState({
        home: "nav-inactive",
        shop: "nav-inactive",
        account: "nav-active"
    })
    const headerActiveClass = "nav-profile-button-active"
    const [profileHeaderActive, setProfileHeaderActive] = useState("profile")
    const [headerClasses, setHeaderClasses] = useState({
        profile: headerActiveClass,
        bids: "",
        settings: ""
    })

    const [userBids, setUserBids] = useState([{
        id: 0,
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

    const [userInfo, setUserInfo] = useState(
        {
            id: 1,
            firstName: "John",
            lastName: "Doe",
            gender: "Male",
            birthDay: "",
            birthMonth: "",
            birthYear: "",
            phoneNumber: "555-5555-555",
            email: "john.doe@mail.com",
            imageUrl: "https://www.kindpng.com/picc/m/24-248253_user-profile-default-image-png-clipart-png-download.png",
            street: "",
            city: "",
            zipCode: "",
            state: "",
            country: "",
            nameOnCard: "",
            paypal: false,
            card: false,
            cardNumber: "",
            cardExpYear: "",
            cardExpMonth: "",
            cvc: ""
        }
    )

    const [validation, setValidation] = useState(
        {
            firstName: "",
            lastName: "",
            birthDay: "",
            birthMonth: "",
            birthYear: "",
            phoneNumber: "",
            email: "",
            street: "",
            zipCode: "",
            state: "",
            nameOnCard: "",
            cardNumber: "",
            cardExpYear: "",
            cardExpMonth: "",
            cvc: ""
        }
    )

    function handleUserInfoChange(name, value) {
        setUserInfo(prevState => ({
            ...prevState,
            [name]: value
        })
        )
    }

    useEffect(() => {
        //TODO Axios api call get user bids
        var bids = [{
            id: 10,
            name: "Black Jacket",
            auctionEndDate: "1605312000000",
            userBid: 50,
            highestBid: 100.25,
            numberOfBids: 3,
            imgUrl: "https://www.namepros.com/attachments/empty-png.89209/"
        },
        {
            id: 11,
            name: "Tablet",
            auctionEndDate: "1605484800000",
            userBid: 150,
            highestBid: 500.17,
            numberOfBids: 1,
            imgUrl: "https://www.namepros.com/attachments/empty-png.89209/"
        },
        {
            id: 5,
            name: "Shoes",
            auctionEndDate: "1606521600000",
            userBid: 230,
            highestBid: 230,
            numberOfBids: 1,
            imgUrl: "https://www.namepros.com/attachments/empty-png.89209/"
        }
        ]
        setUserBids(bids)
        setMonthOptions(getMonths())
        setYearOptions(Array(2100 - 1900 + 1).fill().map((item, index) => 1900 + index))
        setDayOptions(Array(31 - 1 + 1).fill().map((item, index) => 1 + index))

        //TODO Axios api call get user info

    }, [])

    function onHeaderClick(activeButton) {
        switch (activeButton) {
            case "profile":
                setProfileHeaderActive("profile")
                setHeaderClasses({ profile: headerActiveClass, bids: "", settings: "" })
                break;
            case "bids":
                setProfileHeaderActive("bids")
                setHeaderClasses({ profile: "", bids: headerActiveClass, settings: "" })
                break;
            case "settings":
                setProfileHeaderActive("settings")
                setHeaderClasses({ profile: "", bids: "", settings: headerActiveClass })
                break;
        }
    }

    function validate() {

        var isValid = true
        var validationMessage = {
            firstName: "",
            lastName: "",
            birthdate: "",
            phoneNumber: "",
            email: "",
            street: "",
            zipCode: "",
            state: "",
            nameOnCard: "",
            cardNumber: "",
            cardExpYear: "",
            cardExpMonth: "",
            cvc: ""
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

        var nameOnCardValidation = validateOnlyLettersAndNumbers(userInfo.nameOnCard, "Name on card")
        if (!nameOnCardValidation.valid) {
            validationMessage.nameOnCard = nameOnCardValidation.message
            isValid = false;
        }

        var streetValidation = validateOnlyLettersAndNumbers(userInfo.street, "Street")
        if (!streetValidation.valid) {
            validationMessage.street = streetValidation.message
            isValid = false;
        }

        var zipCodeValidation = validateOnlyLettersAndNumbers(userInfo.zipCode, "Zip Code")
        if (!zipCodeValidation.valid) {
            validationMessage.zipCode = zipCodeValidation.message
            isValid = false;
        }

        var stateValidation = validateState(userInfo.state)
        if (!stateValidation.valid) {
            validationMessage.state = stateValidation.message
            isValid = false;
        }

        if (userInfo.cardNumber.length > 0) {
            var cardNumberValidation = validateCardNumber(userInfo.cardNumber)
            if (!cardNumberValidation.valid) {
                validationMessage.cardNumber = cardNumberValidation.message
                isValid = false;
            }
        }

        if (userInfo.cvc.length > 0) {
            var cvcValidation = validateCVC(userInfo.cvc)
            if (!cvcValidation.valid) {
                validationMessage.cvc = cvcValidation.message
                isValid = false;
            }
        }

        var expirationValidation = validateCardExpiration(userInfo.cardExpYear, userInfo.cardExpMonth)
        if (!expirationValidation.valid) {
            validationMessage.cardExpMonth = expirationValidation.messageMonth
            validationMessage.cardExpYear = expirationValidation.messageYear
            isValid = false;
        }

        var birthDateValidation = validateBirthDate(userInfo.birthYear, userInfo.birthMonth, userInfo.birthDay)
        if (!birthDateValidation.valid) {
            validationMessage.birthdate = birthDateValidation.message
            isValid = false
        }

        setValidation(validationMessage)
    }

    function saveInfo() {
        if (validate()) {
            //TODO call api to save data
            //TODO give user feedback on saving
        }
        window.scrollTo(0, 0)
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
                            handleUserInfoChange("imageUrl", url)
                        });
                }
            );
        }
    }

    function SetSection() {
        if (profileHeaderActive == "profile") {
            return <Profile
                genderOptions={genderOptions}

                monthOptions={monthOptions}
                yearOptions={yearOptions}
                dayOptions={dayOptions}

                onChange={handleUserInfoChange}
                userInfo={userInfo}
                saveInfo={saveInfo}
                changeImage={changeImage}

                validation={validation}
            />
        }
        else if (profileHeaderActive == "bids") {
            return <UserBids bids={userBids} />
        }
        else if (profileHeaderActive == "settings") {
            return <Settings />
        }
        return <div></div>
    }


    return (
        <div>
            {console.log(userInfo)}
            <Header active={active} />
            <div className="wrapper">
                <UserProfileHeader setActive={onHeaderClick} classes={headerClasses} />
                {SetSection()}
            </div>
        </div>
    )
}

export default User;