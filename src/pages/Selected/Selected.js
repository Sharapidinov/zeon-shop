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
    const {user} = useSelector(S => S)


    useEffect(() => {
        setSelected(JSON.parse(localStorage.getItem("selected")))
        // axios(` http://localhost:3000/selected`)
        //     .then(({data}) => {
        //         setSelected(data.filter(it => it.uid === user.id))
        //         console.log(data)
        //     })

        if (isLoading){
            setSelected(JSON.parse(localStorage.getItem("selected")))
            setPag(prev => prev + 4)
        }

        if (!selected?.length){
            axios(`http://localhost:3000/bestsellers?&_limit=2`).then(({data}) => setRandomCard(data))
            axios(`http://localhost:3000/new?&_limit=3`).then(({data}) => setRandomCard(prevState => [...prevState, ...data]))
        }
        setIsLoading(false)

    }, [sel,selector?.length, user])


    return (
        <section className="selected-container">

            <BreadCrums name={"Избранное"}/>

            <div className="container p-3">

                <div className="selected-title">Избранное</div>

                <div className="selected-subtitle">
                    {selected?.length ?  `Товаров в избранном: ${selected?.length}` : <p>У Вас пока нет избранных товаров</p>}
                </div>
                <div className="row">
                    {selected
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