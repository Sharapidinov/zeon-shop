import React, {useEffect} from 'react';
import xxx from "../../icons/XXX.svg";
import check from "../../icons/check.svg"
import {useState} from "react";
import {useNavigate} from "react-router";

const HeaderApplication = ({setToggleApplication}) => {
    const [aplName, setAplName] = useState("")
    const [aplNum, setAplNum] = useState("")
    const [nameDirty, setNameDirty] = useState(false)
    const [telDirty, setTelDirty] = useState(false)
    const [nameError, setNameError] = useState("Заполните поле для имени")
    const [telError, setTelError] = useState("Заполните поле для номера телефона")
    const [formValid, setFormValid] = useState(false)
    const [answer, setAnswer] = useState(false)
    const nav = useNavigate()


    useEffect(() => {
        document.body.style.overflow = "hidden"
        return () => {
            document.body.style.overflow = "auto"
        }
    },[])


    useEffect(() => {
        if(nameError || telError){
            setFormValid(false)
        }
        else {
            setFormValid(true)
        }

    },[nameError, telError])

    const nameHandler = (e) => {
        setAplName(e.target.value)
        if (e.target.value.length < 2) {
             setNameError("Введите полное имя")
        }
        else {
            setNameError("")
        }
    }
    const telHandler = (e) => {
        setAplNum(e.target.value)
        if (e.target.value.length < 5) {
            setTelError("Номер телефона не коректный")

        }
        else {
            setTelError("")
        }
    }
    const blurHandler = (e) => {
        switch (e.target.name) {
            case "name":
                setNameDirty(true)
                break
            case "tel" :
                setTelDirty(true)
                break
        }
    }

    const sendData = () => {
        setAnswer(true)
    }

    return (
        <div className="num-application">
            {
                answer
                    ?  <div className="close-application-box">
                        <img src={check} alt=""/>
                        <div className="num-application-title  answer-close ">
                            Спасибо!
                        </div>
                    <div className="answer-close-subtitle  ">
                        Ваша заявка была принята ожидайте, скоро Вам перезвонят
                    </div>

                        <button onClick={() => {
                            setToggleApplication(false)
                            nav("/")
                        }} style={{background:  "#1D1D1B"}} className="num-application-btn">Продолжить покупки</button>
                        
                    </div>

                    :<div className="num-application-box">
                        <form>
                            <img className="close-application" onClick={ () => setToggleApplication(false)} src={xxx} alt=""/>
                            <div className="num-application-title">Если у Вас остались вопросы</div>
                            <div className="num-application-subtitle ">Оставьте заявку и мы обязательно Вам перезвоним</div>
                            <div className="num-application-inp">
                                <div>
                                    {nameDirty && nameError && <div style={{color: "red", textAlign:"start"}}> {nameError}</div>}
                                    <input value={aplName} onBlur={(e) => {blurHandler(e)}} name="name" onChange={(e) => nameHandler(e)} placeholder="Как к Вам обращаться?" type="text"/>
                                </div>
                                <div>
                                    {telDirty && telError && <div style={{color: "red", textAlign:"start"}}> {telError}</div>}
                                    <input value={aplNum} onBlur={(e) => {blurHandler(e)}} name="tel" onChange={(e) => telHandler(e)} placeholder="Номер телефона" type="number"/>
                                </div>
                            </div>
                            <button disabled={!formValid} onClick={() => sendData()} style={formValid? {background:  "#1D1D1B"} : {}} type="button" className="num-application-btn">Заказать звонок</button>
                        </form>
                    </div>

            }
        </div>
    );
};

export default HeaderApplication;