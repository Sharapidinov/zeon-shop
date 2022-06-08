import React, {Component, useEffect} from 'react';
import Slider from "react-slick"
import axios from "axios";

export default class SimpleSlider extends Component {


    render() {


        const settings = {
            dots: true,
            infinite: true,
            speed: 350,
            slidesToShow: 1,
            autoplay: true,
            slidesToScroll: 1,
            nextArrow: <></>,
            prevArrow: <></>
        };

        return (
            <>
                <Slider {...settings}>
                    <div className="slider-box">
                        <img className="slider-img" src="https://cdn.discordapp.com/attachments/978515025473966083/978923942666465290/unknown.png" alt=""/>
                    </div>
                    <div className="slider-box" >
                        <img className="slider-img" src="https://cdn.discordapp.com/attachments/978515025473966083/978923942666465290/unknown.png" alt=""/>
                    </div>
                    <div className="slider-box" >
                        <img className="slider-img" src="https://cdn.discordapp.com/attachments/978515025473966083/978923942666465290/unknown.png" alt=""/>
                    </div>
                    <div className="slider-box" >
                        <img className="slider-img" src="https://cdn.discordapp.com/attachments/978515025473966083/978923942666465290/unknown.png" alt=""/>
                    </div>
                    <div className="slider-box" >
                        <img className="slider-img" src="https://cdn.discordapp.com/attachments/978515025473966083/978923942666465290/unknown.png" alt=""/>
                    </div>
                </Slider>
            </>
        );
    }
}
