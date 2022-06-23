import React, {useState} from 'react';
import {Link} from "react-router-dom";
import {useDispatch} from "react-redux";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import {useEffect} from "react";
import {useNavigate} from "react-router";
import xxx from "../../icons/XXX.svg"

const SignUp = ({setAuthApplication}) => {
    const [email, setEmail] = useState("")
    const [pass, setPass] = useState("")
    const dispatch = useDispatch()
    const nav = useNavigate()

    const clickSignIn = () => {
        const auth = getAuth();
        signInWithEmailAndPassword(auth, email, pass)
            .then(({user}) => {
                console.log(user)
                dispatch({type: "SIGN_UP", user: {email:user.email, id:user.uid, token: user.accessToken},})
                setAuthApplication(false)
            })
            .catch(console.log);

    }


    useEffect(() => {
        document.body.style.overflow = "hidden"
        return () => {
            document.body.style.overflow = "auto"
        }
    },[])

    return (
        <div className="singUp-application">
            <form  className="singUp-application-form">
                <img onClick={ () => setAuthApplication(false)} className="singUp-application-close" src={xxx} alt=""/>
                    <p className="me-auto ms-auto mb-3"><img src="https://cdn.discordapp.com/attachments/978515025473966083/978519958709497897/header-logo.png" alt=""/></p>
                <label className="mb-2">Ваш Email :</label>

                    <input value={email} onChange={ (e) => setEmail(e.target.value)} placeholder="example@gmail.com" className="singUp-application-inp" type="email" name="" id=""/>

                <label className="mb-2">
                    Пароль :
                </label>
                    <input value={pass} onChange={ (e) => setPass(e.target.value)} placeholder="Password" className="singUp-application-inp" type="text" name="" id=""/>

                <button onClick={() => {
                    clickSignIn()
                    nav("/")
                }} style={email.length && pass.length ? {background: "#1D1D1B"} : {}} type="button" className="singUp-application-btn">Войти</button>

                <Link  to= "/register" onClick={() => setAuthApplication(false)} className="singUp-application-link"> Зарегестрироваться </Link>
            </form>
        </div>
    );
};

export default SignUp;