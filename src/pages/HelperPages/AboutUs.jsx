import React from "react";
import "../../index.css"
import Header from "../HeaderFooter/Header";
import PageName from "../HeaderFooter/PageName"

const AboutUs = props => {
    return (
        <div>
            <Header />
            <PageName pageName="about us" />
            <div className="wrapper">
                <div className="helper" >
                    <h2>About Us</h2>
                    <div className="about-us">
                        <div className="about-us-text">
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis consequat pretium turpis, in eleifend mi laoreet sed. Donec ipsum mauris, venenatis sit amet porttitor id, laoreet eu magna. In convallis diam volutpat libero tincidunt semper. Ut aliquet erat rutrum, venenatis lacus ut, ornare lectus. Quisque congue ex sit amet diam malesuada, eget laoreet quam molestie. In id elementum turpis. Curabitur quis tincidunt mauris. Duis pharetra a odio vitae consectetur. Nullam vitae lacinia nisi, at porta sapien. Etiam vehicula augue at lacus tempus euismod. Nullam sit amet eros ut metus pulvinar volutpat et elementum lacus. Cras mauris mi, vulputate ac justo vitae, fringilla vestibulum sapien. Sed hendrerit nulla id luctus placerat. Sed venenatis ornare augue, et viverra dolor ullamcorper id. Duis id quam hendrerit, mollis ex ut, varius ipsum.</p>
                            <br />
                            <p>Etiam bibendum viverra nulla, at cursus leo fringilla eget. In pellentesque viverra elit id vestibulum. Sed eget leo suscipit, commodo urna vitae, efficitur ligula. Pellentesque non mauris blandit, ultrices nibh consectetur, auctor velit. Nunc ac justo lacus. Vivamus et gravida ante. Quisque cursus augue ligula, aliquam ullamcorper enim ultricies sit amet. In placerat sapien eu ligula commodo pharetra. Nunc et facilisis dolor, ut condimentum metus. Phasellus lacinia efficitur diam sed pharetra. Nullam euismod magna at mauris hendrerit scelerisque vitae vel leo. Cras interdum tellus in sapien fermentum consequat.</p>
                        </div>
                        <div className="about-us-images">
                            <div><img src="https://firebasestorage.googleapis.com/v0/b/auction-internship-app.appspot.com/o/images%2Fplaceholder-image.png?alt=media&token=0d5c4077-6c6b-44e0-8088-93ab38ba39db" /></div>
                            <div className="about-us-bottom-images">
                                <img src="https://firebasestorage.googleapis.com/v0/b/auction-internship-app.appspot.com/o/images%2Fplaceholder-image.png?alt=media&token=0d5c4077-6c6b-44e0-8088-93ab38ba39db" />
                                <img src="https://firebasestorage.googleapis.com/v0/b/auction-internship-app.appspot.com/o/images%2Fplaceholder-image.png?alt=media&token=0d5c4077-6c6b-44e0-8088-93ab38ba39db" />
                            </div>
                        </div>
                    </div>


                </div>
            </div>
        </div >

    )
}

export default AboutUs;