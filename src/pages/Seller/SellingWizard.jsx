import React, { useEffect } from "react";
import { useState } from "react";
import GeneralInformation from "../../Components/Seller/GeneralInformation";
import LocationAndShipping from "../../Components/Seller/LocationAndShipping";
import Pricing from "../../Components/Seller/Pricing";
import "../../index.css"
import Header from "../HeaderFooter/Header";
import PageName from "../HeaderFooter/PageName"

const SellingWizard = props => {

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

    const [selectedPhotos, setSelectedPhotos] = useState([])

    const [categories, setCategories] = useState([])
    const [categoryOptions, setCategoryOptions] = useState([])
    const [subcategoryOptions, setSubcategoryOptions] = useState([])
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

    function handleProductChange(name, value) {
        setProduct(prevState => ({
            ...prevState,
            [name]: value
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
    }, [])

    function onCategoryChange(value, label) {
        handleProductChange("categoryName", label)
        handleProductChange("categoryId", value)
        handleProductChange("subcategoryName", "")
        handleProductChange("subcategoryId", 0)
        const subcategories = categories.find(category => category.name == label).subcategories
        setSubcategoryOptions(subcategories.map(sub => ({ value: sub.id, label: sub.name })))
    }

    return (
        <div id="selling-wizard-global">
            <Header active={active} accountActive={activeAccount} />
            <PageName pageName="SELLING WIZARD" pageNav={<div>MY ACCOUNT /<span style={{ color: "#252525", marginLeft: '1em' }}>SELLING</span></div>} />
            <GeneralInformation
                product={product}
                onChange={handleProductChange}
                validation={productValidation}
                categoryOptions={categoryOptions}
                subcategoryOptions={subcategoryOptions}
                onCategoryChange={onCategoryChange}
                setSelectedPhotos={setSelectedPhotos}
            />
            <Pricing
                product={product}
                onChange={handleProductChange}
                validation={productValidation}
            />
            <LocationAndShipping />
        </div >

    )
}

export default SellingWizard;