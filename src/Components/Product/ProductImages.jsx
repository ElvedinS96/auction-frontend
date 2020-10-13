import React from "react"
import "../../index.css"
import 'react-slideshow-image/dist/styles.css'
import { Fade } from 'react-slideshow-image';

const ProductImages = ({ ...props }) => {

    const listImages = props.urls.map((url) =>
        <div className="each-fade">
            <div className="product-image">
                <img src={url} alt="product" />
            </div>
        </div>
    )

    return (
        <div class="product-left">
            <div >
                <Fade autoplay={false} indicators={true}>
                    {listImages}
                </Fade>
            </div>

        </div>
    );

}

export default ProductImages;