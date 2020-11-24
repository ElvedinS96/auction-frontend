import getMonths from "./getMonths";

function validateEmpty(value, name) {
    var validation = {
        valid: true,
        message: ""
    }

    if (!value || value.trim().length == 0) {
        validation.message = name + " is required"
        validation.valid = false;
    }

    return validation
}

function validateOnlyLettersAndNumbers(field, fieldName) {

    var validation = {
        valid: true,
        message: ""
    }

    var reg = /^[A-Za-z0-9\s\-]*$/g
    if (!reg.test(field)) {
        validation.message = fieldName + " cannot contain special characters"
        validation.valid = false;
    }

    return validation
}


function validateOnlyLetters(field, fieldName) {

    var validation = {
        valid: true,
        message: ""
    }

    var reg = /^[A-Za-z\s\-]*$/g
    if (!reg.test(field)) {
        validation.message = fieldName + " cannot contain special characters or numbers"
        validation.valid = false;
    }

    return validation

}

function validateFirstName(firstName) {

    var validation = validateEmpty(firstName, "First Name")
    if (!validation.valid) {
        return validation
    }

    validation = validateOnlyLettersAndNumbers(firstName, "First Name")

    return validation
}

function validateLastName(lastName) {

    var validation = validateEmpty(lastName, "Last Name")
    if (!validation.valid) {
        return validation
    }

    validation = validateOnlyLettersAndNumbers(lastName, "Last Name")

    return validation
}

function validateEmail(email) {
    var validation = {
        valid: true,
        message: ""
    }

    validation = validateEmpty(email, "Email")
    if (!validation.valid) {
        return validation
    }

    var reg = /^[A-z0-9\.\_\-]+\@[a-z]+\.[a-z]+$/g
    if (!reg.test(email)) {
        validation.message = "Invalid email"
        validation.valid = false;
    }

    return validation
}

function validateNumber(number) {

    var validation = {
        valid: true,
        message: ""
    }

    validation = validateEmpty(number, "Phone Number")
    if (!validation.valid) {
        return validation
    }

    var regNumber = /^[0-9]+\-[0-9]+\-[0-9]+$/g
    if (!regNumber.test(number) || !number) {
        validation.message = "Invalid phone number format"
        validation.valid = false;
    }

    return validation
}



function validateState(state) {

    var validation = validateOnlyLetters(state, "State")
    if (!validation.valid) {
        return validation
    }

    validation = validateEmpty(state, "State")

    return validation
}

function validateCountry(country) {

    var validation = validateOnlyLetters(country, "Country")
    if (!validation.valid) {
        return validation
    }

    validation = validateEmpty(country, "Country")

    return validation
}

function validateCity(city) {

    var validation = validateOnlyLetters(city, "City")
    if (!validation.valid) {
        return validation
    }

    validation = validateEmpty(city, "City")

    return validation
}

function validateStreet(street) {

    var validation = validateOnlyLettersAndNumbers(street, "Street")
    if (!validation.valid) {
        return validation
    }

    validation = validateEmpty(street, "Street")

    return validation
}

function validateZipCode(zipCode) {

    var validation = validateOnlyLettersAndNumbers(zipCode, "ZipCode")
    if (!validation.valid) {
        return validation
    }

    validation = validateEmpty(zipCode, "ZipCode")

    return validation
}

function validateNameOnCard(nameOnCard) {

    var validation = validateOnlyLettersAndNumbers(nameOnCard, "Name on card")
    if (!validation.valid) {
        return validation
    }

    validation = validateEmpty(nameOnCard, "Name on card")

    return validation

}


function validateCardNumber(cardNumber) {

    var validation = {
        valid: true,
        message: ""
    }

    validation = validateEmpty(cardNumber, "Card Number")
    if (!validation.valid) {
        return validation
    }

    var reg = /^[0-9]{4}\-[0-9]{4}\-[0-9]{4}\-[0-9]{4}$/g
    if (!reg.test(cardNumber)) {
        validation.message = "Invalid card number format"
        validation.valid = false;
    }

    return validation
}

function validateCVC(cvc) {

    var validation = {
        valid: true,
        message: ""
    }

    validation = validateEmpty(cvc, "CVC")
    if (!validation.valid) {
        return validation
    }

    var reg = /^[0-9]{3,4}$/g
    if (!reg.test(cvc)) {
        validation.message = "Invalid cvc format"
        validation.valid = false;
    }

    return validation
}

function validateCardExpiration(year, month) {

    var validation = {
        valid: true,
        messageMonth: "",
        messageYear: ""
    }

    if (!validateEmpty(month, "Month").valid) {
        validation.messageMonth = "Pick month"
        validation.valid = false;
    }
    if (!validateEmpty(month, "Year").valid) {
        validation.messageYear = "Pick year"
        validation.valid = false;
    }
    if (!validation.valid) {
        return validation
    }

    var yearExp = parseInt(year)
    if (yearExp < new Date().getFullYear()) {
        validation.messageYear = "Invalid year"
        validation.valid = false;
    }

    return validation
}

function validateBirthDate(year, month, day) {
    var validation = {
        valid: true,
        message: ""
    }

    if (year.length == 0 || month.length == 0 || day.length == 0) {
        validation.message = "Birth date is required"
        validation.valid = false;
        return validation
    }

    var yearBirth = parseInt(year)
    var dayBirth = parseInt(day)
    var months = getMonths()
    var monthBirth = months.find(m => m.label == month).value

    if (dayBirth > new Date(yearBirth, monthBirth - 1, 0).getDate()) {
        validation.message = "Invalid date"
        validation.valid = false;
    }

    if (new Date() < new Date(yearBirth, monthBirth, dayBirth)) {
        validation.message = "Invalid date"
        validation.valid = false;
    }

    return validation
}

export {
    validateFirstName, validateLastName, validateEmail, validateNumber, validateOnlyLettersAndNumbers,
    validateState, validateCardNumber, validateCVC, validateCardExpiration, validateBirthDate,
    validateOnlyLetters, validateStreet, validateZipCode, validateCountry, validateCity, validateNameOnCard, validateEmpty
}