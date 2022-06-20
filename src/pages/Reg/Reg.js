import React from 'react';
import {useEffect, useState} from "react";
import {useForm} from "react-hook-form";
import {useNavigate} from "react-router";
import {useDispatch} from "react-redux";
import axios from "axios";
import {Link} from "react-router-dom";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

const Reg = () => {
    const {handleSubmit, reset, register, formState: {errors, isValid}} = useForm({
        mode: "all"
    })
    const nav = useNavigate()
    const dispatch = useDispatch()


    useEffect(() => {
    }, [errors])

    console.log(errors)


    const sendApplication = (data) => {
        console.log(data)
        const auth = getAuth();
        createUserWithEmailAndPassword(auth, data.email, data.pass)
            .then(({user}) => {
                console.log(user)
                dispatch({type: "SIGN_UP", user: {email:user.email, id:user.uid, token: user.accessToken},})
            })
            .catch(console.log);
    }


    return (

        <div className="reg-application">
            <div className="container">
                <form onSubmit={handleSubmit(sendApplication)} className="reg-application-box">
                    <div className="cart-application-title">
                        Регистрация
                    </div>
                    <div>
                        <label className={errors?.name && "text-danger"} htmlFor="name">Ваше имя</label>
                        <input className={errors?.name && "border-danger"} {...register('name', {
                            required: true,
                            minLength: 2,
                            pattern: /[a-zA-ZА-Яа-я]/u
                        })} type="text" placeholder="Например Иван" id="name"/>
                    </div>
                    <div>
                        <label className={errors?.lastName && "text-danger"} htmlFor="lastName">Ваше фамилия</label>
                        <input className={errors?.lastName && "border-danger"} {...register('lastName', {
                            required: true,
                            minLength: 2,
                            pattern: /[a-zA-ZА-Яа-я]/u
                        })} type="text" placeholder="Например Иванов" id="lastName"/>
                    </div>
                    <div>
                        <label className={errors?.email && "text-danger"} htmlFor="email">Электронная почта</label>
                        <input className={errors?.email && "border-danger"} {...register('email', {
                            required: true,
                            minLength: 2,
                            pattern: /^((([0-9A-Za-z]{1}[-0-9A-z\.]{1,}[0-9A-Za-z]{1})|([0-9А-Яа-я]{1}[-0-9А-я\.]{1,}[0-9А-Яа-я]{1}))@([-A-Za-z]{1,}\.){1,2}[-A-Za-z]{2,})$/u
                        })} type="email" placeholder="example@mail.com" id="email"/>
                    </div>
                    <div>
                        <label className={errors?.city && "text-danger"} htmlFor="pass">Пароль</label>
                        <input className={errors?.city && "border-danger"} {...register('pass', {
                            required: true,
                            minLength: 6,
                        })} type="text" placeholder="Введите пароль" id="pass"/>
                    </div>

                    <div className="cart-application-box-checkbox checkbox">
                        <input {...register("agree", {required: true})} className="" type="checkbox" id="agree"/>
                        <label htmlFor="agree"> Согласен с условиями <Link to="/PublicOffer">публичной оферты </Link>
                        </label>

                    </div>

                    <button type="submit" disabled={!isValid} style={isValid ? {background: "#1D1D1B"} : {}}
                            placeholder={"Заказать"} className="num-application-btn"> Зарегестрироваться
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Reg;