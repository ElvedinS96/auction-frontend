import firebase from "firebase/app"
import "firebase/storage"

const firebaseConfig = {
    apiKey: "AIzaSyBOpGMQBaQcIt3aHPXMfFVXfyCMJ1FgDYk",
    authDomain: "auction-internship-app.firebaseapp.com",
    databaseURL: "https://auction-internship-app.firebaseio.com",
    projectId: "auction-internship-app",
    storageBucket: "auction-internship-app.appspot.com",
    messagingSenderId: "773174411510",
    appId: "1:773174411510:web:c9993574865f12a625acd7",
    measurementId: "G-EEJTH3R0L6"
};

firebase.initializeApp(firebaseConfig)

const storage = firebase.storage();

export { storage, firebase as default }