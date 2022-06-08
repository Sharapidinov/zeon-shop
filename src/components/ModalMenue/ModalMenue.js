import React from 'react';
import {useState} from "react";
import arrowUp from "../../icons/burger-up.svg"
import burgerOpen from "../../icons/burger-open.svg"
import whats from "../../icons/whatsapp.svg"
import telephone from "../../icons/telephone.svg"
import telegram from "../../icons/telegram.svg"
import xxx from "../../icons/modal-xxx.svg"

const ModalMenu = ({toggleApplication, setToggleApplication}) => {
    const [toggleBurger, setToggleBurger] = useState(false)


    return (
        <div className="modal-menu">
            <a href="#header"> <img src={arrowUp} alt="" className="modal-arrow"/></a>

            {toggleBurger
                ? <div className="menue">

                    <a target="_blank" href="https://telegram.org/"> <img className="menue-icons" src={telegram}
                                                                          alt=""/> </a>
                    <a target="_blank" href="https://www.whatsapp.com/"> <img className="menue-icons" src={whats}
                                                                              alt=""/></a>
                    <img onClick={() => setToggleApplication(!toggleApplication)} className="me-4" src={telephone}
                         alt=""/>
                    <img className="me-1" src={xxx} onClick={() => setToggleBurger(!toggleBurger)} alt=""/>
                </div>
                :
                <img src={burgerOpen} onClick={() => setToggleBurger(!toggleBurger)} alt="" className="modal-menu-img"/>


            }


        </div>
    );
};

export default ModalMenu;