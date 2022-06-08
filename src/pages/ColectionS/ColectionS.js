import React, {useEffect, useState} from 'react';
import axios from "axios";
import {useParams} from "react-router-dom";
import ProductCard from "../../components/ProductCard/productCard";

const ColectionS = () => {
    const [col, setCol] = useState([])
    const {id} = useParams()
    useEffect(() => {
        axios(`http://localhost:3000/collection?id=${id}`)
            .then(({data}) => {
                setCol(data[0])
                console.log(data)
            })
    },[])


    return (
        <section className="collection">
            <div className="container">
                <div className="collection-title">
                    Колекция {col?.title}
                </div>

                <div className="row">
                    {
                        col?.products?.map(it => {
                            return(
                                <div className="col-3">
                                    <ProductCard it={it} name={"new"} />
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </section>
    );
};

export default ColectionS;