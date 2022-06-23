import React, {useEffect, useState} from 'react';
import axios from "axios";
import {useParams,} from "react-router-dom";
import bag from "../../icons/shopping-bag 1.svg"
import heart from "../../icons/heart.svg"
import fullheart from "../../icons/full-heart-forparoduct.svg"
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router"
import ProductCard from "../../components/ProductCard/productCard";
import ColorItem from "../Help/ColorItem";


const Product = () => {
    const [item, setItem] = useState()
    const [toggleColor, setToggleColor] = useState(item?.color[0] || "#73A39D")
    const [toggleBnt, setToggleBtn] = useState(false)
    const {user} = useSelector(s => s)
    const [randomCard, setRandomCard] = useState([])
    // const [selected, setSelected] = useState(null)
    const {name, id} = useParams()
    const dispatch = useDispatch()
    const nav = useNavigate()

    const findSel = JSON.parse(localStorage.getItem("selected"))?.find(selected => selected?.id === id)
    const findCart = JSON?.parse(localStorage?.getItem("cart"))?.find(selected => selected?.id === id && selected?.color === toggleColor)


    const [add, setAdd] = useState(!!findSel?.selected)

    useEffect(() => {
        if (id <= 8) {
          let name = "bestsellers"
            axios(`http://localhost:3000/${name}/${id}`)
                .then(({data}) => setItem(data))
        }
        else {
            let name = "new"
            axios(`http://localhost:3000/${name}/${id}`)
                .then(({data}) => setItem(data))
        }

        axios(`http://localhost:3000/bestsellers?&_limit=2`).then(({data}) => setRandomCard(data))
        axios(`http://localhost:3000/new?&_limit=3`).then(({data}) => setRandomCard(prevState => [...prevState, ...data]))

        console.log(findCart?.color)
    }, [name, toggleColor, dispatch, toggleBnt])


    const addToSelect = (it) => {
        it.name = name
        it.selected = true

        const items = localStorage.getItem("selected")
        let newItems = items ? JSON.parse(items) : []

        if (findSel) {
            newItems = newItems.filter(sel => sel.id !== it.id)
            setAdd(false)
        } else {
            newItems.push(it)
            setAdd(true)
        }
        localStorage.setItem("selected", JSON.stringify(newItems))
        dispatch({type: "UPDATE_SELECTED", selected: newItems})

    }

    const addToCart = (it) => {


        const cart = localStorage.getItem("cart")
        let newCart = cart ? JSON?.parse(cart) : []
        console.log(findCart)
        if (findCart?.color === toggleColor) {
            setToggleBtn(false)
        } else {
            newCart.push({...it, color: toggleColor})
            setToggleBtn(false)
        }
        localStorage.setItem("cart", JSON.stringify(newCart))
        dispatch({type: "UPDATE_CART", cart: newCart})
        setToggleBtn(true)
    }



    useEffect(() => {
        setToggleBtn(findCart?.color === toggleColor)
    }, [toggleColor])

    const checkColor = (color) => {
        setToggleColor(color)
    }
    // const toggleChooseColor = (color) => {
    //     if (chooseColor === color) {
    //         return setChooseColor(null)
    //     }
    //     setChooseColor(color)
    // }


    return (
        <div className="container">
            <div className="detail-flex-box mb-5">
                <div className="col-6">
                    <div className="detail-img-flex-box">
                        <div className="col-6">
                            <div>
                                <img className="product-img" src={item?.image} alt=""/>
                            </div>
                        </div>
                        <div className="col-6">
                            <div>
                                <img className="product-img" src={item?.image} alt=""/>
                            </div>
                        </div>
                        <div className="col-6">
                            <div className="">
                                <img className="product-img" src={item?.image} alt=""/>
                            </div>
                        </div>
                        <div className="col-6">
                            <div>
                                <img className="product-img" src={item?.image} alt=""/>
                            </div>
                        </div>

                        <div className="col-3">
                            <img className="product-img" src={item?.image} alt=""/>
                        </div>
                        <div className="col-3">
                            <img className="product-img" src={item?.image} alt=""/>
                        </div>
                        <div className="col-3">
                            <img className="product-img" src={item?.image} alt=""/>
                        </div>
                        <div className="col-3">
                            <img className="product-img" src={item?.image} alt=""/>
                        </div>
                    </div>
                </div>
                <div className="col-6">
                    <div className="product-info-box">
                        <div className="product-info-box-title">
                            {item?.title}
                        </div>
                        <div className="product-info-box-articule">
                            Артикул: <p className="ms-2"> {item?.artikule}</p>
                        </div>
                        <div onClick={e => e.stopPropagation()}
                             className="product-card-colors  text-center items-center mb-3">
                            <div onClick={e => e.stopPropagation()} className="d-flex align-items-center text-center">
                                Цвет:    &#8195;
                                {
                                    item?.color?.map(color => {
                                        return (
                                            <ColorItem checkColor={checkColor} color={color} />

                                        )
                                    })}
                            </div>
                        </div>

                        {
                            item?.discount ? <div className="product-info-box-price">

                                    {Math.ceil(item.price - (+item.price / 100 * +item.discount))} p <span> {item?.price} p</span>

                                </div>
                                : <div className="product-info-box-price">
                                    {item?.price} p
                                </div>
                        }

                        <div className="product-info-box-discription">
                            <p>О товаре:</p>
                            {item?.discription}
                        </div>
                        <div className="row">
                            <div className="col-6">
                                <div className="product-info-box-size">
                                    Размерный ряд: <p>{item?.size}</p>
                                </div>
                                <div className="product-info-box-amount">
                                    Количество в линейке : <p>{item?.amount}</p>
                                </div>
                            </div>
                            <div className="col-6">
                                <div className="product-info-box-structure">
                                    Состав ткани: <p>{item?.structure}</p>
                                </div>
                                <div className="product-info-box-material">
                                    Материал: <p>{item?.material}</p>
                                </div>
                            </div>
                        </div>

                        <div className="product-btn">
                            {
                                toggleBnt ?
                                    <button onClick={() => nav("/cart") } className=" product-info-box-btn">Перейти в корзину</button>
                                    : <button disabled={!user.id} onClick={() => addToCart(item)}
                                              className="product-info-box-btn"><img src={bag}
                                                                                                 alt=""/> Добавить в
                                        корзину</button>
                            }
                            <button disabled={!user.id}  onClick={() => addToSelect(item)} className="product-btn-bag "><img
                                src={!!add ? fullheart : heart} alt=""/></button>
                        </div>

                    </div>
                </div>
            </div>

            <div className="interesting">
                <div className="interesting-title">Похожие товары</div>
                <div className="row">
                    {randomCard?.map(it => {
                        return (
                            <div key={it.id + it?.color[0]} className="col-5">
                                <ProductCard  it={it} toggle={!it.selected} name={it.id > 8 ?"new" :"bestsellers"}/>
                            </div>
                        )
                    })}
                </div>

            </div>
        </div>
    );
};

export default Product;