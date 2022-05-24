import React, {useEffect, useState} from 'react';
import axios from "axios";

const Header = () => {
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
        <header>
            <div>

                <div className="header-info">

                    <div className="header-links">
                        <div className="me-4">О нас</div>
                        <div className="me-4">Коллекции</div>
                        <div>Новости </div>
                    </div>


                    <div className="header-tel">
                        <span> Тел:</span> {info?.tel}
                    </div>
                </div>
            </div>

            <div className="gray-line"></div>

            <div>
                <div className="header-content d-flex">
                    <div className="header-logo me-4">
                        <img src={info?.icons?.headericon} alt=""/>
                    </div>

                    <input className="header-search" type="text"/>

                    <div className="header-content-btn d-flex">

                        <div className="selected me-5"> Избраное</div>
                        <div className="basket"> Корзина</div>

                    </div>

                </div>

            </div>
        </header>
    );
};

export default Header;