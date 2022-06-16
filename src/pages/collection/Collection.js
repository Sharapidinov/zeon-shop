import React, {useEffect, useState} from 'react';
import axios from "axios";
import CollectionCard from "../../components/CollectionCard/CollectionCard";
import BreadCrums from "../../components/Breadcrums/BreadCrums";
import ProductCard from "../../components/ProductCard/productCard";

const Collection = () => {
    const [col , setCol] = useState([])
    const [page, setPage] = useState(0)

    const [totalCount, setTotalCount] = useState(0)
    const pageArray = Array(totalCount/8).fill(0)


    useEffect(() => {
        axios(`http://localhost:3000/collection?_page=${page}&_limit=8`)
            .then((res) => {
                setCol(res.data)
                setTotalCount(res.headers["x-total-count"])
            })




    },[page])






    return (
        <section className="collection">
            <BreadCrums name={"Коллекции"}/>
            <div className="container">
                <div className="collection-title">
                    Коллекции
                </div>

                <div className="collection-row">
                    {
                        col.map(it => {
                            return (
                                <CollectionCard key={it.id} it={it}/>
                            )
                        })
                    }
                    <div className="d-flex col-btn">
                        {pageArray.map((it,idx) => {
                            return (
                                <button onClick={() =>setPage(idx+ 1) } className="pagination-btn ">{idx+1}</button>
                            )
                        })}
                    </div>

                </div>



            </div>
        </section>
    );
};

export default Collection;