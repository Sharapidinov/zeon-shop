import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import xxx from "../../icons/XXX.svg"
import ProductCard from "../../components/ProductCard/productCard";
import axios from "axios";
import CartApplication from "../../components/CartApplication/CartApplication";
import BreadCrums from "../../components/Breadcrums/BreadCrums";

const Cart = () => {
    const [cartProducts, setCartProducts] = useState([])
    const [randomCard, setRandomCard] = useState([])
    const [toggleApplication, setToggleApplication] = useState(false)
    const dispatch = useDispatch()
    const [isShow, setIsShow] = useState(false)

    const {cart} = useSelector(s => s)

    useEffect(()=> {
       setCartProducts(JSON.parse( localStorage.getItem("cart")))

        axios(`http://localhost:3000/bestsellers?&_limit=2`).then(({data}) => setRandomCard(data))
        axios(`http://localhost:3000/new?&_limit=3`).then(({data}) => setRandomCard(prevState => [...prevState, ...data]))
        console.log(randomCard)

    }, [])
    useEffect(() => {},[cart])
    // console.log(cartProducts)



    const deleteFromCart = (it) => {
        let newCart = cartProducts


        const indx = newCart.findIndex(item => it?.id === item?.id && it?.color === item?.color)
        newCart.splice(indx, 1)
        localStorage?.setItem("cart", JSON.stringify(newCart))
        dispatch({type: "UPDATE_CART", cart: newCart})
    }



    const countUp = (it) => {
        let newItem = cartProducts?.filter(elem => it.color === elem.color && it.id === elem.id)
        newItem[0].count = +newItem[0].count + 1

        // console.log(cartProducts)
        localStorage?.setItem("cart", JSON.stringify(cartProducts))
        dispatch({type: "UPDATE_CART", cart: cartProducts})
    }


    const countDown = (it) => {
        let newCart = cartProducts
        let newItem = newCart?.filter(elem => it?.color === elem?.color && it?.id === elem?.id)[0]


        // console.log(newCart)

        if (newItem.count > 1) {
            newItem.count = +newItem.count - 1
        }
        else {
          const indx = newCart.findIndex(item => it?.id === item?.id && it?.color === item?.color)
            newCart.splice(indx, 1)
        }
        // console.log(newCart)
        localStorage?.setItem("cart", JSON.stringify(newCart))
        dispatch({type: "UPDATE_CART", cart: newCart})

    }


    return (
        <section className="cart">
            <BreadCrums name={"Корзина"}/>
            <div className="container">
                {cartProducts && cartProducts?.length >= 1
                ?<div className="row">
                        <div className="col-66">
                            {cartProducts?.map(it => {
                                return (
                                    <div key={it.id + it.color} className="cart-card">
                                        <div className="cart-card-box">
                                            <div><img className="cart-img" src={it?.image} alt=""/> </div>
                                            <div className="cart-card-text-box">
                                                <div className="cart-card-title">{it.title}</div>
                                                <div className="cart-card-size">Размер: {it.size}</div>
                                                <div className="cart-card-color"><p>Цвет:</p> <div className="border"><div className=" cart-color" style={{backgroundColor:`${it.color}`}}></div></div></div>
                                                {
                                                    it?.discount ?  <div className="product-info-box-price mb-3">

                                                            {Math.ceil( it?.price -( +it?.price / 100 * +it?.discount) )  }   p <span> {it?.price} p</span>

                                                        </div>
                                                        : <div className="product-info-box-price">
                                                            {it?.price} p
                                                        </div>
                                                }

                                                <div className="count-box">
                                                    <button onClick={() => countDown(it)} >-</button>
                                                    <div >{it?.count} </div>
                                                    <button onClick={() => countUp(it)} >+</button>
                                                </div>
                                            </div>

                                            <img className="cart-xxx" onClick={() => deleteFromCart(it)} src={xxx} alt=""/>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                        <div className="price-card-col">
                            <div className="price-card">
                                {!isShow && (
                                    <div className="price-card-num-box">
                                        <div className="price-card-title">
                                            Сумма заказов
                                        </div>
                                        <div className="price-card-num">
                                            <p>Количество линеек:</p> <p className="price-card-num-black">{cartProducts?.reduce((acc, it, idx) => {
                                            return +(acc + +it?.count)
                                        }, 0).toLocaleString().split(`,`).join(" ")} шт</p>
                                        </div>
                                        <div className="price-card-num">
                                            <p>Количество товаров:</p> <p className="price-card-num-black">{cartProducts?.reduce((acc, it) => {
                                            return +(acc +it?.count * +it.amount)
                                        }, 0).toLocaleString()} шт</p>
                                        </div>
                                        <div className="price-card-num">
                                            <p>Стоимость:</p> <p className="price-card-num-black">{cartProducts?.reduce((acc, it) => {
                                            return +(acc  +(+it?.price * it.count)  )
                                        },0).toLocaleString().split(`,`).join(" ")} рублей</p>
                                        </div>
                                        <div className="price-card-num">
                                            <p>Скидка:</p> <p className="price-card-num-black">{cartProducts?.reduce((acc, it) => {
                                            return +(acc + it.count *  Math.ceil( it?.price - (it?.price - ( +it?.price / 100 * +it?.discount))) )
                                        }, 0).toLocaleString().split(`,`).join(" ")} рублей</p>
                                        </div>
                                    </div>
                                )}

                                <div className="price-card-total-price">


                                    <div className="price-card-num">
                                        <p>Итого к оплате:</p> <p className="price-card-num-black">{cartProducts?.reduce((acc, it) => {
                                        return +(acc + (+it?.price * it.count) -  it.count * Math.ceil( it?.price - (it?.price - ( +it?.price / 100 * +it?.discount))))
                                    }, 0).toLocaleString().split(`,`).join(" ")} рублей</p>
                                    </div>
                                    {isShow ? (
                                        <button
                                            className="cart_details-show mb-2"
                                            onClick={() => setIsShow(false)}
                                        >
                                            Информация о заказе
                                        </button>
                                    ) : (
                                        <button
                                            className="cart_details-show mb-2"
                                            onClick={() => setIsShow(true)}
                                        >
                                            Скрыть
                                        </button>
                                    )}

                                    <button onClick={() => setToggleApplication(!toggleApplication)} className="price-card-btn" > Оформить заказ </button>

                                </div>
                            </div>
                        </div>
                    </div>
                    :<div className="interesting">
                        <div className="cart-title">
                            Корзина
                        </div>
                        <div className="cart-subtitle">
                            У Вас пока нет товаров в корзине
                        </div>

                        <div className="interesting-title">Возможно Вас заинтересует</div>
                        <div className="row">
                            {randomCard?.map(it => {
                                return (
                                    <div key={it.id + it.color[2]} className="col-5">
                                        <ProductCard it={it} toggle={!it.selected} name={it.id > 8 ?"new" :"bestsellers"}/>
                                    </div>
                                )
                            })}
                        </div>

                    </div>

                }
            </div>

            {toggleApplication && <CartApplication setToggleApplication={setToggleApplication} cartProducts={cartProducts} />}

        </section>
    );
};

export default Cart;