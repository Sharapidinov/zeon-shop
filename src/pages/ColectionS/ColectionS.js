import React, {useEffect, useState} from 'react';
import axios from "axios";
import {Link, useParams} from "react-router-dom";
import ProductCard from "../../components/ProductCard/productCard";

const ColectionS = () => {
    const [col, setCol] = useState([])
    const [newProduct, setNewProduct] = useState([])
    const {id} = useParams()
    useEffect(() => {
        axios(`http://localhost:3000/collection?id=${id}`)
            .then(({data}) => {
                setCol(data[0])
                console.log(data)
            })

        axios(`http://localhost:3000/new?&_limit=5`)
            .then(({data}) => {
                setNewProduct(data)
            })
    },[])


    return (
        <section className="collection">

            <div className="breadcrumb-box">
                <div className="container">
                    <div className="breadcrumb align-items-center mb-0">
                        <p className="breadcrumb-item mb-0"><Link className="text-decoration-none" style={{color:"#393939"}} to={"/"}>Главная</Link></p>
                        <p className="breadcrumb-item mb-0"><Link className="text-decoration-none" style={{color:"#393939"}} to={"/collection"}>Коллекции</Link></p>
                        <p className="breadcrumb-item active mb-0" >{col?.title}</p>
                    </div>
                </div>

            </div>

            <div className="container">
                <div className="collection-title">
                    Коллекция {col?.title}
                </div>

                <div className="collection-row mb-3">
                    {
                        col?.products?.map(it => {
                            return(
                                <div className="col-3 mb-1">
                                    <ProductCard it={it} name={"new"} />
                                </div>
                            )
                        })
                    }
                </div>


                <div className="collection-title">
                    Новинки
                </div>

                <div className="row mb-3">

                {newProduct?.map((it) => {
                    return (
                        <div key={it?.id} className="col-5">
                            <ProductCard toggle={!it.selected} name={"new"} it={it}/>
                        </div>
                    )
                })}
            </div>

            </div>
        </section>
    );
};

export default ColectionS;