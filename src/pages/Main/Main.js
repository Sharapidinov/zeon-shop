import React, {useEffect, useState} from 'react';
import SimpleSlider from "../../components/Slider/Slider";
import {useDispatch, useSelector} from "react-redux";
import axios from "axios";
import ProductCard from "../../components/ProductCard/productCard";
import {useNavigate} from "react-router";
import CollectionCard from "../../components/CollectionCard/CollectionCard";
import BreadCrums from "../../components/Breadcrums/BreadCrums";
import ModalMenue from "../../components/ModalMenue/ModalMenue";



const Main = ({toggleApplication, setToggleApplication}) => {

    const dispatch = useDispatch()
    const [advant, setAdvant] = useState([])
    const {products, newProduct, collection, cart} = useSelector((store) => store)
    const [bestLim, setBestLim] = useState(4)
    const [newLim, setNewLim] = useState(4)
    const [colLim, setColLim] = useState(4)
    const nav = useNavigate()

    useEffect(() => {
        axios(`http://localhost:3000/bestsellers?&_limit=${bestLim}`)
            .then(({data}) => {
                dispatch({type: "GET_PRODUCTS", products: data})
            })
        axios(`http://localhost:3000/new?&_limit=${newLim}`)
            .then(({data}) => {
                dispatch({type: "GET_NEWPRODUCTS", newProduct: data})
            })
        axios(`http://localhost:3000/prevcol?&_limit=${colLim}`)
            .then(({data}) => {
                dispatch({type: "GET_COLL", collection: data})
            })
        axios("http://localhost:3000/our_advantages")
            .then(({data}) => {
                setAdvant(data)
            })
    }, [newLim, bestLim, colLim, cart])



    return (


        <main>


            {products.length && newProduct.length && <div className="container">
                <div className="slider">
                    <SimpleSlider/>
                </div>
                <div className="bestseller">

                    <div className="title">
                        Хит продаж
                    </div>

                    <div className="row mb-3">
                        {products?.map((it) => {
                            return (
                                <div key={it?.id} className="col-3">
                                    <ProductCard it={it} toggle={!it.selected} name={"bestsellers"} />
                                </div>
                            )
                        })}
                    </div>
                    <div className="show-more-btn">
                        { +bestLim <= 4 ? <button onClick={() => setBestLim(bestLim + 4)}>Еще</button> : <></>   }
                    </div>
                </div>
                <div className="new">

                    <div className="title">
                        Новинки
                    </div>


                    <div className="row mb-3">
                        {newProduct?.map((it) => {
                            return (
                                <div key={it?.id} className="col-3">
                                    <ProductCard toggle={!it.selected} name={"new"} it={it}/>
                                </div>
                            )
                        })}
                    </div>
                    <div className="show-more-btn">
                        { +newLim <= 4 ? <button onClick={() => setNewLim(newLim + 4)} >Еще</button> : <></>   }
                    </div>
                </div>
            </div>}

            <div className="collection">
               <div className="container">
                   <div className="title">
                       Коллекция
                   </div>


                   <div className="row mb-5 d-flex">
                       {
                           collection.map(it => {
                               return(
                                   <CollectionCard key={it.id} it={it}/>
                               )
                           })
                       }
                   </div>
                   <div className="show-more-btn">
                       { +colLim <= 4 ? <button onClick={() => setColLim(colLim + 4)}>Еще</button> : <></>   }
                   </div>
               </div>
            </div>


            <div className="our_advantages">
                <div className="container">
                    <div className="title">
                        Наши преимущества
                    </div>

                    <div className="our_advantages-felx-box">
                        {
                            advant.map(it => {
                                return (
                                    <div key={it.title} className="col-3">
                                        <div className="advant-box">
                                            <img src={it?.image} alt=""/>
                                            <div>{it.title}</div>
                                            <p>{it.text}</p>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            </div>
            <ModalMenue toggleApplication={toggleApplication} setToggleApplication={setToggleApplication} />
        </main>
    );
};

export default Main;