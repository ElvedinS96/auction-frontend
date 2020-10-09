import React from "react";
import "../../index.css"

const FeatureProduct = ({ ...props }) => {

    return (
        <div className="home-top-feature">
            <div className="home-top-product">
                <h2>Running Shoes</h2>
                <h5>Start from - $240.00</h5>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce ut consequat nulla. Duis nec fermentum erat, et varius augue. Vivamus sed tempor libero. </p>
                <button type="btn">BID NOW</button>
            </div>
            <div>
                <img src="https://www.freepngimg.com/thumb/shoes/28084-5-sneaker-transparent-image-thumb.png" alt="product" />
            </div>
        </div>
    );
}

export default FeatureProduct;