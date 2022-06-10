import React, {useState, useEffect} from 'react';
import axios from "axios";
import tel from "../../images/tel-logo.svg"
import email from "../../images/email-icon.svg"
import {Link} from "react-router-dom";


const Footer = () => {

    const [info, setInfo] = useState({})

    useEffect(() => {
    axios("http://localhost:3000/header-footer")
        .then(({data}) => {
            setInfo(data[0])
        } )
        .catch(e => console.log(e))

    },[])

    return (
        <footer className="" >
        <div className="footer-flex-box container">
            <div>
                <div className="footer-logo-box">
                   <Link to="/" > <img src={info?.icons?.footerlogo} alt=""/></Link>
                    <p className="footer-text">Developed by Zeon 2022</p>
                </div>
            </div>
            <div>
                <div className="footer-about-us-box">
                    <div className="footer-title">
                        Компания
                    </div>
                   <p> <Link to="/about-us"  className="mb-4">О нас</Link></p>
                    <p> <Link to="/news">Новости </Link></p>
                    <p><Link to="/help">Помощь </Link> </p>
                </div>
            </div>
            <div>
                <div className="footer-about-us-box">
                    <div className="footer-title">
                        Контакты
                    </div>
                    <p><a href={`tel:${info?.tel}`}><img className="me-1"  src={tel} alt="tel icon"/> {info?.tel} </a></p>
                    <p><a href={`tel:${info?.tel}`}><img className="me-1"  src={tel} alt="tel icon"/> {info?.tel} </a></p>
                    <p><a href={`mailto:${info?.email}`}><img  className="me-1" src={email} alt="email icon"/> {info?.email} </a></p>
                </div>
            </div>
            <div>
                <div className="footer-about-us-box">
                    <div className="footer-title">
                        Мы в социальных сетях
                    </div>
                    <p><a target="_blank" href="https://instagram.com/"><img className="me-1" src={info?.icons?.instagram} alt="instagram icon"/> Instagram </a></p>
                    <p> <a target="_blank" href="https://telegram.org/"><img className="me-1"  src={info?.icons?.telegram} alt="telegram icon"/> Telegram</a>  </p>
                    <p> <a target="_blank" href="https://www.whatsapp.com/"><img className="me-1"  src={info?.icons?.whatsapp} alt="whatsapp icon"/> Whatsapp</a>  </p>
                </div>
            </div>
        </div>


        </footer>
    );
};

export default Footer;