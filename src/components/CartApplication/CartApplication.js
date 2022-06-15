import React, {useEffect, useState} from 'react';
import {useForm} from "react-hook-form";
import xxx from "../../icons/XXX.svg";
import 'react-phone-number-input/style.css'
import PhoneInput from 'react-phone-number-input'
import axios from "axios";
import check from "../../icons/check.svg";
import {useNavigate} from "react-router";
import {Link} from "react-router-dom";
import {useDispatch} from "react-redux";

const CartApplication = ({setToggleApplication, cartProducts}) => {
    const [toggle, setToggle] = useState(false)
    const [numValue, setNumValue] = useState("")
    const {handleSubmit, reset, register, formState:{errors, isValid}} = useForm({
        mode:"all"
    })
    const nav = useNavigate()
    const dispatch = useDispatch()


    useEffect(() => {}, [errors])

    console.log(errors)


    const sendApplication = (data) => {
        const product = {...data, products: [...cartProducts], finalPayment: `${cartProducts?.reduce((acc, it) => {
                return +(acc + (+it?.price * it.count) * it.amount) -  it.count * Math.ceil( it?.price - (it?.price - ( +it?.price / 100 * +it?.discount) * it?.amount))
            }, 0)} рублей`}
        console.log(product)
        axios.post("http://localhost:3000/application", product).then(({data}) => {
            if (data.length) {
                alert("Ожидайте звонка")
            }
            reset()
            setNumValue("")
            setToggle(true)
        }).catch(e => alert(e?.response?.data?.message || "Error"))
    }


    return (

        <div className="cart-application">

            {
                toggle ? <div className="close-application-box">
                    <img src={check} alt=""/>
                    <div className="num-application-title  answer-close ">
                        Спасибо!
                    </div>
                    <div className="answer-close-subtitle  ">
                        Ваша заявка была принята ожидайте, скоро Вам перезвонят
                    </div>

                    <button onClick={() => {
                        setToggleApplication(false)
                        localStorage.removeItem("cart")
                        dispatch({type: "UPDATE_CART", cart:[]})
                        nav("/")
                    }
                    } style={{background:  "#1D1D1B"}} className="num-application-btn">Продолжить покупки</button>

                </div>

                    : <form onSubmit={handleSubmit(sendApplication)} className="cart-application-box">
                        <img className="cart-application-close" onClick={() => setToggleApplication(false)} src={xxx} alt=""/>
                        <div className="cart-application-title">
                            Оформление заказа
                        </div>
                        <div>
                            <label className={errors?.name &&"text-danger"} htmlFor="name">Ваше имя</label>
                            <input className={errors?.name && "border-danger" } {...register('name', {
                                required: true,
                                minLength: 2,
                                pattern: /[a-zA-ZА-Яа-я]/u
                            })} type="text" placeholder="Например Иван" id="name"/>
                        </div>
                        <div>
                            <label className={errors?.lastName &&"text-danger"} htmlFor="lastName">Ваше фамилия</label>
                            <input className={errors?.lastName && "border-danger" } {...register('lastName', {
                                required: true,
                                minLength: 2,
                                pattern: /[a-zA-ZА-Яа-я]/u
                            })} type="text" placeholder="Например Иванов" id="lastName"/>
                        </div>
                        <div>
                            <label className={errors?.email &&"text-danger"} htmlFor="email">Электронная почта</label>
                            <input className={errors?.email && "border-danger" } {...register('email', {
                                required: true,
                                minLength: 2 ,
                                pattern: /^((([0-9A-Za-z]{1}[-0-9A-z\.]{1,}[0-9A-Za-z]{1})|([0-9А-Яа-я]{1}[-0-9А-я\.]{1,}[0-9А-Яа-я]{1}))@([-A-Za-z]{1,}\.){1,2}[-A-Za-z]{2,})$/u
                            })} type="email" placeholder="example@mail.com" id="email"/>
                        </div>
                        <div className="phone-inp">
                            <label className={numValue.length >3 &&"text-danger"} htmlFor="telNum">Ваш номер телефона</label>
                            <PhoneInput
                                value={numValue}
                                onChange={e => setNumValue(e.target.value)}
                                {...register('telNum', {
                                    required: true,
                                    minLength: 7
                                })}
                                international
                                defaultCountry="KG"
                                placeholder="Введите номер телефона"
                                id="telNum"

                                className={errors?.telNum && "border-danger" }
                            />
                        </div>
                        <div>
                            <label className={errors?.country &&"text-danger"} htmlFor="country">Страна</label>
                            <input className={errors?.country && "border-danger" } {...register('country', {
                                required: true,
                                minLength: 2,
                                pattern: /[a-zA-ZА-Яа-я]/u
                            })} type="text" placeholder="Введите страну" id="country"/>
                        </div>
                        <div>
                            <label className={errors?.city && "text-danger"} htmlFor="city">Город</label>
                            <input className={errors?.city && "border-danger" } {...register('city', {
                                required: true,
                                minLength: 2,
                                pattern: /[a-zA-ZА-Яа-я]/u
                            })} type="text" placeholder="Введите город" id="city"/>
                        </div>
                    
                        <div className="cart-application-box-checkbox checkbox">
                            <input {...register( "agree", {required :true})} className="" type="checkbox" id="agree"/>
                            <label htmlFor="agree"> Согласен с условиями <Link to="/PublicOffer" >публичной оферты </Link> </label>

                        </div>

                        <button type="submit" disabled={!isValid} style={isValid? {background:  "#1D1D1B"} : {}} placeholder={"Заказать"} className="num-application-btn"> Заказать</button>

                    </form>


            }


        </div>
    );
};

export default CartApplication;