import React, {useEffect, useState} from 'react';
import axios from "axios";
import up from "../../icons/arrow-up.svg"
import down from "../../icons/arrow-down.svg"
import BreadCrums from "../../components/Breadcrums/BreadCrums";

const Help = () => {
    const [help, setHelp] = useState({})
    const [selected, setSelected] = useState(null)

    useEffect(() => {
        axios(" http://localhost:3000/help")
            .then(({data}) => {
                // console.log(data.questions)
                setHelp(data)
            })
    },[])

    const toggle = (idx) => {
        if (selected === idx) {
            return setSelected(null)
        }
        setSelected(idx)
    }

    return (
        <section className="help">
            <BreadCrums name={"Помощь"}/>
            <div className="container">
                <div className="help-flex">
                    <div className="help-img">
                        <img src={help?.image} alt=""/>
                    </div>
                     <div className="">
                         <div className="help-title">
                             Помощь
                         </div>
                            <div className="accordion-box">
                                {
                                    help?.questions?.map((it,idx) => {
                                        return(
                                            <div key={idx}  className="accordion-conent-item">
                                                <div  onClick={() => toggle(idx)} className={`accordion-title `}>
                                                    <p>{it?.quest}</p> <p><img src={selected === idx ? up : down} alt=""/></p>
                                                </div>
                                                <div className={selected === idx ? "accordion-content show" : "accordion-content"}>
                                                    <p>{it?.answer}</p>
                                                </div>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        </div>
                    </div>
            </div>
        </section>
    );
};

export default Help;