import React, {useEffect, useState} from 'react';
import axios from "axios";
import {Link} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import heart from "../../icons/heartForHeader.svg"
import HC from "../../icons/heartWithCircle.svg"
import bag from "../../icons/shopping-bagBlack.svg"
import fullBag from "../../icons/shopping-bagCircle.svg"
import HeaderApplication from "../HeaderAplication/HeaderApplication";
import {useNavigate} from "react-router";
import searchIcon from "../../icons/zondicons_search.svg"
import burger from "../../icons/burger-menu.svg"
import telegram from "../../icons/telegram.svg";
import whats from "../../icons/whatsapp.svg";
import telephone from "../../icons/telephone.svg";
import xxx from "../../icons/XXX.svg";
import SignUp from "../SignUp/SignUp";
import {getAuth, signOut} from "firebase/auth";


const Header = ({toggleApplication, setToggleApplication}) => {
    const [sel, setSel] = useState([])
    const [getCart, setGetSel] = useState([])
    const [info, setInfo] = useState({})
    const {selected, cart, user} = useSelector(s => s)
    const [res, setRes] = useState([])
    const [searchRes, setSearchRes] = useState([])
    const [searchStr, setSearchStr] = useState("")
    const [toggleSearch, setToggleSearch] = useState(false)
    const [toggleBurgerMenu, setToggleBurgerMenu] = useState(false)
    const [toggleModalSearch, setToggleModalSearch] = useState(false)
    const [authApplication, setAuthApplication] = useState(false)
    const nav = useNavigate()
    const dispatch = useDispatch()
    useEffect(() => {},[cart, selected])

    const logOut = () => {
        const auth = getAuth();
        signOut(auth)
        dispatch({type: "LOG_OUT"})
    }

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

                        <div className="d-flex text-center align-items-center justify-content-center">
                            {
                                !!user.email
                                    ? <><p className="m-0 p-0" >{user.email}</p> <div>	&#8195;/&#8195; </div> <div className="log-out" onClick={logOut}>Выйти</div></>
                                    : <p onClick={() => setAuthApplication(!authApplication)} className="m-0 p-0 " >Войти</p>

                            }
                        </div>

                        <div className="header-tel">
                            <a className="header-tel-link" href={`tel:${info?.tel}`}><span> Тел:</span> {info?.tel}</a>
                        </div>
                    </div>
                </div>



                <div>
                    <div className="header-content d-flex">
                        
                        <div onClick={() => {setToggleBurgerMenu(!toggleBurgerMenu)}} className="burger-menu">
                            <img src={burger} alt=""/>
                        </div>
                        
                        
                        <div className="header-logo">
                            <Link to={"/"}><img src={info?.icons?.headericon} alt=""/></Link>
                        </div>



                        <div className="adaptive-search">
                            <button onClick={() => setToggleModalSearch(!toggleModalSearch)}  className="search-icon" ><img src={ toggleModalSearch? xxx: searchIcon} alt=""/></button>

                        </div>

                        {toggleModalSearch &&
                            <div className="adaptive-search-input">

                                <div className="adaptive-search-input-box">
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
                                    <button onClick={ () => {
                                        nav("/search", {state: {searchRes, searchStr}})
                                        setToggleModalSearch(false)
                                        setSearchStr("")
                                    }
                                    }  className="adaptive-search-icon" ><img src={searchIcon} alt=""/></button>

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

                            </div>
                        }


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
            {toggleBurgerMenu && <div className="burger-menu-box">

                <div>
                    <img onClick={() => setToggleBurgerMenu(!toggleBurgerMenu)} className="close-burger-menu" src={xxx} alt=""/>
                    <div className="burger-menu-title mb-3">Меню</div>
                    <div className="header-links flex-column text-start align-items-start">
                        <Link to="/about-us" className="mb-2">О нас</Link>
                        <Link to="/collection" className="mb-2"> Коллекции</Link>
                        <Link to="/news">Новости </Link>
                    </div>
                    <hr style={{opacity:"0.3"}}/>

                    <div className="burger-content-btn">

                        <div className="selected br mb-2"><Link to="/selected"> <img className="me-3 mb-2"
                                                                                src={!!sel?.length ? HC : heart}
                                                                                alt=""/> Избранное </Link></div>
                        <div className="selected "><Link to="/cart"> <img className="me-3"
                                                                          src={!!getCart?.length ? fullBag : bag}
                                                                          alt=""/> Корзина</Link></div>

                    </div>

                </div>
                <div>
                    <p className="mb-2">Свяжитсь с нами:</p>

                    <div className="header-tel mb-2">
                        <a className="header-tel-link" href={`tel:${info?.tel}`}><span> Тел:</span> {info?.tel}</a>
                    </div>

                    <div>
                        <a style={{fontSize:"0"}} target="_blank" href="https://telegram.org/"> <img className="menue-icons" src={telegram}
                                                                              alt=""/></a>
                        <a style={{fontSize:"0"}} target="_blank" href="https://www.whatsapp.com/"> <img className="menue-icons" src={whats}
                                                                                  alt=""/></a>
                        <a style={{fontSize:"0"}} > <img  onClick={() => setToggleApplication(!toggleApplication)} className="me-4" src={telephone}
                                   alt=""/></a>
                    </div>

                </div>
            </div>}
            {authApplication && <SignUp setAuthApplication={setAuthApplication} /> }
        </header>
    );
};

export default Header;