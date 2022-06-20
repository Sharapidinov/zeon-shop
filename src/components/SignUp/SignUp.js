import React, {useState} from 'react';
import {Link} from "react-router-dom";
import {useDispatch} from "react-redux";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

const SignUp = ({setAuthApplication}) => {
    const [email, setEmail] = useState("")
    const [pass, setPass] = useState("")
    const dispatch = useDispatch()

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



    return (
        <div className="singUp-application">
            <form  className="singUp-application-form">
                    <p className="me-auto ms-auto mb-3"><img src="https://cdn.discordapp.com/attachments/978515025473966083/978519958709497897/header-logo.png" alt=""/></p>
                <label className="mb-2">Ваш Email :</label>

                    <input value={email} onChange={ (e) => setEmail(e.target.value)} placeholder="example@gmail.com" className="singUp-application-inp" type="email" name="" id=""/>

                <label className="mb-2">
                    Пароль :
                </label>
                    <input value={pass} onChange={ (e) => setPass(e.target.value)} placeholder="Password" className="singUp-application-inp" type="text" name="" id=""/>

                <button onClick={clickSignIn} type="button" className="singUp-application-btn">Войти</button>

                <Link  to= "/register" onClick={() => setAuthApplication(false)} className="singUp-application-link"> Зарегестрироваться </Link>

            </form>
        </div>
    );
};

export default SignUp;