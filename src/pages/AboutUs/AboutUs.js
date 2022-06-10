import React from 'react';
import BreadCrums from "../../components/Breadcrums/BreadCrums";

const AboutUs = () => {


    return (
        <section className="about-us">
            <BreadCrums name={"О нас"}/>
            <div className="container">
                <div className="row">
                    <div className="col-6  ">
                        <div className="d-flex justify-content-end alight-items-end">
                            <div className="col-7">
                                <div className="rol-6 mb-3">
                                    <img
                                        src="https://cdn.discordapp.com/attachments/978515025473966083/979333461917708318/unknown.png"
                                        alt=""/>
                                </div>
                                <div className="rol-6">
                                    <img
                                        src="https://cdn.discordapp.com/attachments/978515025473966083/979333499066650644/unknown.png"
                                        alt=""/>
                                </div>
                            </div>
                            <div className="col-4 d-flex align-items-center justify-content-start ms-3 me-5 ">
                                <img
                                    src="https://cdn.discordapp.com/attachments/978515025473966083/979333516548534352/unknown.png"
                                    alt=""/>
                            </div>
                        </div>
                    </div>
                    <div className="col-6 d-flex align-items-end justify-content-center flex-column">
                       <div className="about-us-text-box">
                           <div className="about-us-title">
                               О нас
                           </div>
                           <div className="about-us-subtitle">
                               У нас Вы найдёте всё, что Вам так нужно. Ассортимент магазина постоянно расширяется и
                               дополняется в зависимости от пожеланий клиентов. Женская одежда из наших коллекций – это
                               комфортная, стильная и качественная одежда не только на каждый день, но и для любых ситуаций
                               по доступным ценам.Натуральные материалы, продуманные силуэты, современный дизайн и
                               возможность легкого сочетания моделей помогут Вам всегда оставаться в центре внимания и
                               чувствовать себя уместно в любой ситуации.Если Вы любите одеваться ярко, модно и
                               оригинально, у нас Вы найдете все необходимое, чтобы всегда быть в центре внимания. У нас
                               большая коллекция для любого торжества и праздника, которая сможет удовлетворить вкус самой
                               взыскательной модницы! А для деловых ситуаций, в которых Вам непременно нужно выглядеть
                               элегантно и стильно, мы предлагаем Вам одежду из коллекции "деловой стиль и офис". Мода
                               постоянно диктует нам свои требования и для современной девушки, желающей идти в ногу со
                               временем, важно иметь возможность постоянно пополнять свой гардероб стильной одеждой.
                           </div>
                       </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AboutUs;