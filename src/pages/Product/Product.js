import React, {useEffect, useState} from 'react';
import axios from "axios";
import {useParams,} from "react-router-dom";
import bag from "../../icons/shopping-bag 1.svg"
import heart from "../../icons/heart.svg"
import fullheart from "../../icons/full-heart-forparoduct.svg"
import {useDispatch} from "react-redux";
import {useNavigate} from "react-router"

const Product = () => {
    const [item, setItem] = useState()
    const [toggleColor, setToggleColor] = useState(item?.color[0] || "#73A39D")
    const [toggleBnt, setToggleBtn] = useState(false)
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


    return (
        <div className="container">
            <div className="row">
                <div className="col-6">
                    <div className="row">
                        <div className="col-6">
                            <div className="pt-2">
                                <img className="product-img" src={item?.image} alt=""/>
                            </div>
                        </div>
                        <div className="col-6">
                            <div className="pt-2">
                                <img className="product-img" src={item?.image} alt=""/>
                            </div>
                        </div>
                        <div className="col-6">
                            <div className="pt-2">
                                <img className="product-img" src={item?.image} alt=""/>
                            </div>
                        </div>
                        <div className="col-6">
                            <div className="pt-2">
                                <img className="product-img" src={item?.image} alt=""/>
                            </div>
                        </div>

                        <div className="col-3 pt-2">
                            <img className="product-img" src={item?.image} alt=""/>
                        </div>
                        <div className="col-3 pt-2">
                            <img className="product-img" src={item?.image} alt=""/>
                        </div>
                        <div className="col-3 pt-2">
                            <img className="product-img" src={item?.image} alt=""/>
                        </div>
                        <div className="col-3 pt-2">
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
                                            <div onClick={() => checkColor(color)} className="colors"
                                                 style={{backgroundColor: `${color}`}}></div>
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
                                    : <button onClick={() => addToCart(item)}
                                              className="product-info-box-btn"><img src={bag}
                                                                                                 alt=""/> Добавить в
                                        корзину</button>
                            }
                            <button onClick={() => addToSelect(item)} className="product-btn-bag "><img
                                src={!!add ? fullheart : heart} alt=""/></button>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default Product;