import React, {useState} from 'react';
import {useForm} from "react-hook-form";
import xxx from "../../icons/XXX.svg";
import 'react-phone-number-input/style.css'
import PhoneInput from 'react-phone-number-input'
import axios from "axios";

const CartApplication = ({setToggleApplication, cartProducts}) => {
    const [numValue, setNumValue] = useState("")
    const {handleSubmit, reset, register} = useForm()


    const sendApplication = (data) => {
        const product = {...data, products: [...cartProducts]}
        console.log(product)
        axios.post("http://localhost:3000/application", product).then(({data}) => {
            if (data.length) {
                alert("Ожидайте звонка")
            }
            reset()
            setNumValue("")
        }).catch(e => alert(e?.response?.data?.message || "Error"))
    }











    return (
        <div className="cart-application">
            <form onSubmit={handleSubmit(sendApplication)} className="cart-application-box">
                <img className="cart-application-close" onClick={() => setToggleApplication(false)} src={xxx} alt=""/>
                <div className="cart-application-title">
                    Оформление заказа
                </div>
                <div>
                    <label htmlFor="name">Ваше имя</label>
                    <input {...register('name')} type="text" placeholder="Например Иван" id="name"/>
                </div>
                <div>
                    <label htmlFor="lastName">Ваше фамилия</label>
                    <input {...register('lastName')} type="text" placeholder="Например Иванов" id="lastName"/>
                </div>
                <div>
                    <label htmlFor="email">Электронная почта</label>
                    <input {...register('email')} type="email" placeholder="example@mail.com" id="email"/>
                </div>
                <div className="phone-inp">
                    <label htmlFor="telNum">Ваш номер телефона</label>
                    <PhoneInput
                        value={numValue}
                        onChange={e => setNumValue(e.target.value)}
                        {...register('telNum')}
                        international
                        defaultCountry="KG"
                        placeholder="Введите номер телефона"
                        id="telNum"

                    />
                </div>
                <div>
                    <label htmlFor="country">Страна</label>
                    <input {...register('country')} type="text" placeholder="Введите страну" id="country"/>
                </div>
                <div>
                    <label htmlFor="city">Город</label>
                    <input {...register('city')} type="text" placeholder="Введите город" id="city"/>
                </div>
                <button  className="num-application-btn">заказать</button>
            </form>
        </div>
    );
};

export default CartApplication;