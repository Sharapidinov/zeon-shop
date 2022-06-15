import React, {useEffect, useState} from 'react';
import axios from "axios";
import {Link} from "react-router-dom";
import {useSelector} from "react-redux";
import heart from "../../icons/heartForHeader.svg"
import HC from "../../icons/heartWithCircle.svg"
import bag from "../../icons/shopping-bagBlack.svg"
import fullBag from "../../icons/shopping-bagCircle.svg"
import HeaderApplication from "../HeaderAplication/HeaderApplication";
import {useNavigate} from "react-router";
import searchIcon from "../../icons/zondicons_search.svg"
import burger from "../../icons/burger-menu.svg"


const Header = ({toggleApplication, setToggleApplication}) => {
    const [sel, setSel] = useState([])
    const [getCart, setGetSel] = useState([])
    const [info, setInfo] = useState({})
    const {selected, cart} = useSelector(s => s)
    const [res, setRes] = useState([])
    const [searchRes, setSearchRes] = useState([])
    const [searchStr, setSearchStr] = useState("")
    const [toggleSearch, setToggleSearch] = useState(false)
    const nav = useNavigate()

    useEffect(() => {},[cart, selected])


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
        setSearchRes( res.filter(it => it.title.toLowerCase().includes(str.toLowerCase())) || [])
        setSearchStr(str)
        setToggleSearch(true)
    }
    const toggleNav = (e) => {
        if (e.code === "Enter"){
            nav("/search", {state: {searchRes, searchStr}})
        }
    }

    return (
        <header id="header">
            <div className="header-line"></div>
            <div className="container">
                <div>

                    <div className="header-info">

                        <div className="header-links">
                            <Link to="/about-us" className="me-4">О нас</Link>
                            <Link to="/collection" className="me-4"> Коллекции</Link>
                            <Link to="/news">Новости </Link>
                        </div>


                        <div className="header-tel">
                            <a className="header-tel-link" href={`tel:${info?.tel}`}><span> Тел:</span> {info?.tel}</a>
                        </div>
                    </div>
                </div>


                <div>
                    <div className="header-content d-flex">
                        
                        <div className="burger-menu">
                            <img src={burger} alt=""/>
                        </div>
                        
                        
                        <div className="header-logo">
                            <Link to={"/"}><img src={info?.icons?.headericon} alt=""/></Link>
                        </div>

                        <div className="search">

                            <input onKeyDown={ e => toggleNav(e)}
                                   onBlur={ () => {
                                       setTimeout(() => {
                                           setSearchRes([])
                                           setToggleSearch(false)
                                       }, 300)

                                   } }
                                   placeholder="Поиск"
                                   onChange={e => search(e.target.value)}
                                   className="header-search" type="text"/>
                            <button onClick={ () => nav("/search", {state: {searchRes, searchStr}}) }  className="search-icon" ><img src={searchIcon} alt=""/></button>
                            { toggleSearch &&
                                <div className="search-res-box">
                                <div className="search-items">
                                    {
                                        searchRes?.map(it => {
                                            console.log(it)
                                            return (

                                                <Link to={it.id < 8 ? `bestsellers/${it.id}` : `new/${it.id}`}>
                                                    <div key={it.id + it.count + it.title} className="search-res">
                                                        {it.title}
                                                    </div>
                                                </Link>
                                            )
                                        })
                                    }
                                </div>

                            </div>}

                        </div>


                        <div className="header-content-btn d-flex">

                            <div className="selected br"><Link to="/selected"> <img className="me-3"
                                                                                      src={!!sel?.length ? HC : heart}
                                                                                      alt=""/> Избранное </Link></div>
                            <div className="selected "><Link to="/cart"> <img className="me-3"
                                                                              src={!!getCart?.length ? fullBag : bag}
                                                                              alt=""/> Корзина</Link></div>

                        </div>

                    </div>
                    <div className="line"></div>
                </div>
            </div>
            {
                toggleApplication && <HeaderApplication setToggleApplication={setToggleApplication}/>
            }
        </header>
    );
};

export default Header;