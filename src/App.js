import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link, BrowserRouter } from "react-router-dom"
import Registration from "./pages/Authentication/Registration"
import Login from "./pages/Authentication/Login"
import "./index.css"
import Footer from "./pages/HeaderFooter/Footer"
import Header from "./pages/HeaderFooter/Header"
import PrivacyAndPolicy from "./pages/HelperPages/PrivacyAndPolicy"
import TermsAndConditions from "./pages/HelperPages/TermsAndConditions"
import AboutUs from "./pages/HelperPages/AboutUs"

function App() {

  const BASE_URL = "https://auctionapp-server.herokuapp.com"

  return (
    <div>
      <Header />
      <BrowserRouter>
        <Switch>
          <Route path="/about"><AboutUs /></Route>
          <Route path="/terms"><TermsAndConditions /></Route>
          <Route path="/privacy"><PrivacyAndPolicy /></Route>
          <Route path="/login"> <Login baseUrl={BASE_URL} /> </Route>
          <Route path="/register"> <Registration baseUrl={BASE_URL} /> </Route>
        </Switch>
      </BrowserRouter>
      <Footer />
    </div>

  );
}

export default App;
