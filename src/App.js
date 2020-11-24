import React from 'react';
import { Switch, Route, BrowserRouter } from "react-router-dom"
import Registration from "./pages/Authentication/Registration"
import Login from "./pages/Authentication/Login"
import "./index.css"
import Footer from "./pages/HeaderFooter/Footer"
import PrivacyAndPolicy from "./pages/HelperPages/PrivacyAndPolicy"
import TermsAndConditions from "./pages/HelperPages/TermsAndConditions"
import AboutUs from "./pages/HelperPages/AboutUs"
import Product from "./pages/Product/Product"
import NotFound from "./Components/Error/NotFound"
import InternalServerError from "./Components/Error/InternalServerError"
import Home from "./pages/Home/Home"
import SearchResult from './pages/Product/SearchResult';
import Shop from './pages/Shop/Shop';
import PrivateRoute from "./Util/PrivateRoute"
import User from './pages/User/User';
import BecomeSeller from './pages/Seller/BecomeSeller';
import SellingWizard from './pages/Seller/SellingWizard'

function App() {

  const BASE_URL = process.env.REACT_APP_BASE_URL

  return (
    <div>
      <BrowserRouter>
        <Switch>
          <Route path="/" exact><Home baseUrl={BASE_URL} /></Route>
          <Route path="/404"><NotFound /></Route>
          <Route path="/500"><InternalServerError /></Route>
          <Route path="/about"><AboutUs /></Route>
          <Route path="/terms"><TermsAndConditions /></Route>
          <Route path="/privacy"><PrivacyAndPolicy /></Route>
          <Route path="/login"> <Login baseUrl={BASE_URL} /> </Route>
          <Route path="/register"> <Registration baseUrl={BASE_URL} /> </Route>
          <Route path="/product/:id"><Product baseUrl={BASE_URL} /></Route>
          <Route path="/products"><SearchResult baseUrl={BASE_URL} /></Route>
          <Route path="/shop"><Shop baseUrl={BASE_URL} /></Route>
          <PrivateRoute path="/account"><User baseUrl={BASE_URL} /></PrivateRoute>
          <PrivateRoute path="/become-seller"><BecomeSeller baseUrl={BASE_URL} /></PrivateRoute>
          <PrivateRoute path="/selling"><SellingWizard baseUrl={BASE_URL} /></PrivateRoute>
        </Switch>
      </BrowserRouter>
      <Footer />
    </div>

  );
}

export default App;
