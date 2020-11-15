import getMonths from "./getMonths";

function validateFirstName(firstName) {
    var validation = {
        valid: true,
        message: ""
    }

    if (!firstName || firstName.trim().length == 0) {
        validation.message = "First Name is required"
        validation.valid = false;
    }

    var regFirstName = /^[A-Za-z0-9\s\-]*$/g
    if (!regFirstName.test(firstName)) {
        validation.message = "First Name cannot contain special characters"
        validation.valid = false;
    }

    return validation
}

function validateLastName(lastName) {

    var validation = {
        valid: true,
        message: ""
    }

    if (!lastName || lastName.trim().length == 0) {
        validation.message = "Last Name is required"
        validation.valid = false;
    }

    var regLastName = /^[A-Za-z0-9\s\-]*$/g
    if (!regLastName.test(lastName)) {
        validation.message = "Last Name cannot contain special characters"
        validation.valid = false;
    }

    return validation
}

function validateEmail(email) {
    var validation = {
        valid: true,
        message: ""
    }

    if (!email || !email.includes("@") || !email.includes(".")) {
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

    var regNumber = /^[0-9]+\-[0-9]+\-[0-9]+$/g
    if (!regNumber.test(number) || !number) {
        validation.message = "Invalid phone number format"
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

function validateState(state) {

    var validation = {
        valid: true,
        message: ""
    }

    var reg = /^[A-Za-z\s\-]*$/g
    if (!reg.test(state)) {
        validation.message = "State cannot contain special characters or numbers"
        validation.valid = false;
    }

    return validation
}

function validateCardNumber(cardNumber) {

    var validation = {
        valid: true,
        message: ""
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

    if (year.length > 0 && month.length == 0) {
        validation.messageMonth = "Pick month"
        validation.valid = false;
        return validation
    }
    if (year.length == 0 && month.length > 0) {
        validation.messageYear = "Pick year"
        validation.valid = false;
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

    if (dayBirth > new Date(yearBirth, monthBirth, 0).getDate()) {
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
    validateState, validateCardNumber, validateCVC, validateCardExpiration, validateBirthDate
}