import React from "react";
import "../../index.css"
import ListProductPreview from "./ListProductPreview";
import ShopHeader from "./ShopHeader";

const ShopList = ({ ...props }) => {

    const products = [{ id: 1, imagesUrl: ["https://www.tate.org.uk/art/images/work/L/L01/L01682_10.jpg"], name: "Product name", price: 100, description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum hendrerit odio a erat lobortis auctor. Curabitur sodales pharetra placerat. Aenean auctor luctus tempus. Cras laoreet et magna in dignissim. Nam et tincidunt augue. Vivamus quis malesuada velit. In hac habitasse platea dictumst." },
    { id: 1, imagesUrl: ["https://www.tate.org.uk/art/images/work/L/L01/L01682_10.jpg"], name: "Product name", price: 100, description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum hendrerit odio a erat lobortis auctor. Curabitur sodales pharetra placerat. Aenean auctor luctus tempus. Cras laoreet et magna in dignissim. Nam et tincidunt augue. Vivamus quis malesuada velit. In hac habitasse platea dictumst." },
    { id: 1, imagesUrl: ["https://www.tate.org.uk/art/images/work/L/L01/L01682_10.jpg"], name: "Product name", price: 100, description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum hendrerit odio a erat lobortis auctor. Curabitur sodales pharetra placerat. Aenean auctor luctus tempus. Cras laoreet et magna in dignissim. Nam et tincidunt augue. Vivamus quis malesuada velit. In hac habitasse platea dictumst." },
    { id: 1, imagesUrl: ["https://www.tate.org.uk/art/images/work/L/L01/L01682_10.jpg"], name: "Product name", price: 100, description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum hendrerit odio a erat lobortis auctor. Curabitur sodales pharetra placerat. Aenean auctor luctus tempus. Cras laoreet et magna in dignissim. Nam et tincidunt augue. Vivamus quis malesuada velit. In hac habitasse platea dictumst." },
    { id: 1, imagesUrl: ["https://www.tate.org.uk/art/images/work/L/L01/L01682_10.jpg"], name: "Product name", price: 100, description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum hendrerit odio a erat lobortis auctor. Curabitur sodales pharetra placerat. Aenean auctor luctus tempus. Cras laoreet et magna in dignissim. Nam et tincidunt augue. Vivamus quis malesuada velit. In hac habitasse platea dictumst." },
    { id: 1, imagesUrl: ["https://www.tate.org.uk/art/images/work/L/L01/L01682_10.jpg"], name: "Product name", price: 100, description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum hendrerit odio a erat lobortis auctor. Curabitur sodales pharetra placerat. Aenean auctor luctus tempus. Cras laoreet et magna in dignissim. Nam et tincidunt augue. Vivamus quis malesuada velit. In hac habitasse platea dictumst." },
    { id: 1, imagesUrl: ["https://www.tate.org.uk/art/images/work/L/L01/L01682_10.jpg"], name: "Product name", price: 100, description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum hendrerit odio a erat lobortis auctor. Curabitur sodales pharetra placerat. Aenean auctor luctus tempus. Cras laoreet et magna in dignissim. Nam et tincidunt augue. Vivamus quis malesuada velit. In hac habitasse platea dictumst." }]

    const listProducts = products.map((product) =>
        <div className="shop-grid-product">
            <ListProductPreview product={product} />
        </div>
    )

    return (
        <div className="shop-products">
            <ShopHeader dropValue={props.dropValue} handleDropdown={props.handleDropdown} onClick={props.onClick} gridClass={props.gridClass} listClass={props.listClass} />
            {listProducts}
        </div>
    )
}

export default ShopList;