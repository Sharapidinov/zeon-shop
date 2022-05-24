import React, {useState, useEffect} from 'react';
import axios from "axios";
import tel from "../../images/tel-logo.svg"
import email from "../../images/email-icon.svg"


const Footer = () => {

    const [info, setInfo] = useState({})

    useEffect(() => {
    axios("https://628b5f19667aea3a3e2dd83f.mockapi.io/header-footer")
        .then(({data}) => {
            setInfo(data[0])
            console.log(info)
        } )
        .catch(e => console.log(e))

    },[])

    return (
        <footer>
        <div className="row">
            <div className="col-3">
                <div className="footer-logo-box">
                    <img src={info?.icons?.footerlogo} alt=""/>
                </div>
            </div>
            <div className="col-3">
                <div className="footer-about-us-box">
                    <div className="footer-title">
                        Компания
                    </div>
                    <p>О нас</p>
                    <p>Новости</p>
                    <p>Помощь</p>
                </div>
            </div>
            <div className="col-3">
                <div className="footer-about-us-box">
                    <div className="footer-title">
                        Контакты
                    </div>
                    <p><img className="me-1"  src={tel} alt="tel icon"/> {info?.tel} </p>
                    <p><img className="me-1"  src={tel} alt="tel icon"/> {info?.tel} </p>
                    <p><img  className="me-1" src={email} alt="email icon"/> {info?.email} </p>
                </div>
            </div>
            <div className="col-3">
                <div className="footer-about-us-box">
                    <div className="footer-title">
                        Мы в социальных сетях
                    </div>
                    <p><img className="me-1" src={info?.icons?.instagram} alt="instagram icon"/> Instagram </p>
                    <p><img className="me-1"  src={info?.icons?.telegram} alt="telegram icon"/> Telegram </p>
                    <p><img className="me-1"  src={info?.icons?.whatsapp} alt="whatsapp icon"/> Whatsapp </p>
                </div>
            </div>
        </div>

        <p className="footer-text">Developed by Zeon 2022</p>
        </footer>
    );
};

export default Footer;