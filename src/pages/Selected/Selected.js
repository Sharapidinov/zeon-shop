import React, {useEffect, useState} from 'react';
import {useSelector} from "react-redux";
import ProductCard from "../../components/ProductCard/productCard";
import axios from "axios";
import BreadCrums from "../../components/Breadcrums/BreadCrums";

const Selected = () => {
    const [selected, setSelected] = useState([])
    const sel = useSelector(s => s.selected)
    const [randomCard, setRandomCard] = useState([])
    const selector = useSelector(s => s)
    const [isLoading, setIsLoading] = useState(true)
    const [pag, setPag] = useState(4)


    useEffect(() => {
        setSelected(JSON.parse(localStorage.getItem("selected")))

        if (isLoading){
            setSelected(JSON.parse(localStorage.getItem("selected")))
            setPag(prev => prev + 4)
        }

        if (!selected?.length){
            axios(`http://localhost:3000/bestsellers?&_limit=2`).then(({data}) => setRandomCard(data))
            axios(`http://localhost:3000/new?&_limit=3`).then(({data}) => setRandomCard(prevState => [...prevState, ...data]))
            console.log(randomCard)
        }
        setIsLoading(false)

    }, [sel,selector?.length])
    //
    // useEffect(() => {
    //     document.addEventListener("scroll", scrollHendler)
    //     return function () {
    //         document.removeEventListener("scroll", scrollHendler)
    //     }
    // },[isLoading])
    //
    // const scrollHendler = (e) => {
    //     console.log(e.target.documentElement.scrollHeight - (e.target.documentElement.scrollTop + window.innerHeight))
    //     if(e.target.documentElement.scrollHeight - 100 - (e.target.documentElement.scrollTop + window.innerHeight) < 100 && selected.length > pag){
    //         setIsLoading(true)
    //         console.log(true)
    //     }
    // }


    return (
        <section className="selected-container">

            <BreadCrums name={"Избранное"}/>

            <div className="container p-3">

                <div className="selected-title">Избранное</div>

                <div className="selected-subtitle">
                    {selected?.length ?  `Товаров в избранном: ${selected?.length}` : <p>У Вас пока нет избранных товаров</p>}
                </div>
                <div className="row">
                    {selected?.filter((it,idx) => idx < pag)
                        ?.map((it) => {

                        return (
                            <div key={it?.id} className="col-3">
                                <ProductCard it={it} toggle={it.selected} name={it.name}/>
                            </div>
                        )
                    })}
                    {!selected?.length &&
                        <div className="interesting">
                            <div className="interesting-title">Возможно Вас заинтересует</div>
                            <div className="row">
                                {randomCard?.map(it => {
                                    return (
                                        <div key={it.id + it?.color[0]} className="col-5">
                                            <ProductCard  it={it} toggle={!it.selected} name={it.id > 8 ?"new" :"bestsellers"}/>
                                        </div>
                                    )
                                })}
                            </div>

                    </div>}
                </div>
            </div>
        </section>
    );
};

export default Selected;