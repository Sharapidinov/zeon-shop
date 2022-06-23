import React, {useEffect} from 'react';
import {useLocation} from "react-router-dom";
import ProductCard from "../../components/ProductCard/productCard";
import axios from "axios";
import {useState} from "react";
import BreadCrums from "../../components/Breadcrums/BreadCrums";

const SearchPage = () => {
   const {state}= useLocation()
    const [randomCard, setRandomCard] = useState([])
    console.log(state)

    useEffect(() => {
        axios(`http://localhost:3000/bestsellers?&_limit=2`).then(({data}) => setRandomCard(data))
        axios(`http://localhost:3000/new?&_limit=3`).then(({data}) => setRandomCard(prevState => [...prevState, ...data]))
    },[] )

    return (
        <section className="search-page">


            <BreadCrums name={"Результаты поиска"}/>


            <div className="container">
                <div className="search-title">
                    Результаты поиска по запросу:{state.searchStr}
                </div>

                <div className="d-flex flex-wrap">
                    {
                        state.searchRes.map(it => {

                            return (
                                <div className="search-col">
                                    <ProductCard  it={it} toggle={!it.selected} name={it.id > 8 ?"new" :"bestsellers"} />
                                </div>
                            )
                        })
                    }
                </div>

                {
                    !state.searchRes.length && <>

                    <div className="search-subtitle">
                        По Вашему запросу ничего не найдено.
                    </div>

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

                        </div>

                    </>
                }


            </div>
        </section>
    );
};

export default SearchPage;