import React, {useEffect, useState} from 'react';
import axios from "axios";
import {Link} from "react-router-dom";
import {useSelector} from "react-redux";
import heart from "../../icons/heartForHeader.svg"
import HC from "../../icons/heartWithCircle.svg"
import bag from "../../icons/shopping-bagBlack.svg"
import fullBag from "../../icons/shopping-bagCircle.svg"
import HeaderApplication from "../HeaderAplication/HeaderApplication";
import {logDOM} from "@testing-library/react";


const Header = ({toggleApplication, setToggleApplication}) => {
    const [sel, setSel] = useState([])
    const [getCart, setGetSel] = useState([])
    const [info, setInfo] = useState({})
    const {selected, cart} = useSelector(s => s)
    const [res, setRes] = useState([])
    const [searchRes, setSearchRes] = useState([])
    const [toggleSearch, setToggleSearch] = useState(false)



    useEffect(() => {
        axios("http://localhost:3000/header-footer")
            .then(({data}) => {
                setInfo(data[0])
            })
            .catch(e => console.log(e))


        axios("http://localhost:3000/bestsellers").then(({data}) => setRes([...data]))
        axios("http://localhost:3000/new").then(({data}) => setRes(prev => [...prev, ...data]))


        setSel(JSON.parse(localStorage.getItem("selected")))
        setGetSel(JSON.parse(localStorage.getItem("cart")))

    }, [selected, cart, toggleApplication, searchRes?.length, toggleSearch])


    const search = (str) => {
        // console.log(res)
        console.log( res.filter(it => it.title.toLowerCase().includes(str.toLowerCase())))
        setSearchRes( res.filter(it => it.title.toLowerCase().includes(str.toLowerCase())) || [])
        // console.log(res.filter(it => it.title.toLowerCase().includes(str.toLowerCase())))
    }

    return (
        <header id="header">
            <div className="container">
                <div>

                    <div className="header-info">

                        <div className="header-links">
                            <Link to="/about-us" className="me-4">О нас</Link>
                            <Link to="/collection" className="me-4"> Коллекции</Link>
                            <Link to="/news">Новости </Link>
                        </div>


                        <div onClick={() => setToggleApplication(!toggleApplication)} className="header-tel">
                            <span> Тел:</span> {info?.tel}
                        </div>
                    </div>
                </div>


                <div>
                    <div className="header-content d-flex">
                        <div className="header-logo me-4">
                            <Link to={"/"}><img src={info?.icons?.headericon} alt=""/></Link>
                        </div>

                        <div className="search">

                            <input onChange={e => search(e.target.value)} onClick={() => setToggleSearch(true)} className="header-search" type="text"/>

                            <div className="search-res-box">
                                {
                                    toggleSearch &&
                                    searchRes?.map(it => {
                                        console.log(it)
                                        return (

                                            <Link to={it.id < 8 ?`bestsellers/${it.id}`: `new/${it.id}` }><div key={it.id + it.count + it.title} className="search-res">
                                                {it.title}
                                            </div></Link>
                                        )
                                    })
                                }
                            </div>

                        </div>


                        <div className="header-content-btn d-flex">

                            <div className="selected me-5"><Link to="/selected"> <img className="me-3"
                                                                                      src={!!sel?.length ? HC : heart}
                                                                                      alt=""/> Избраное </Link></div>
                            <div className="selected "><Link to="/cart"> <img className="me-3"
                                                                              src={!!getCart?.length ? fullBag : bag}
                                                                              alt=""/> Корзина</Link></div>

                        </div>

                    </div>

                </div>
            </div>
            {
                toggleApplication && <HeaderApplication setToggleApplication={setToggleApplication}/>
            }
        </header>
    );
};

export default Header;