import React, {useEffect, useState} from 'react';
import axios from "axios";
import CollectionCard from "../../components/CollectionCard/CollectionCard";
import BreadCrums from "../../components/Breadcrums/BreadCrums";
import ProductCard from "../../components/ProductCard/productCard";
import prev from "../../icons/prev.svg"
import next from "../../icons/next.svg"

const Collection = () => {
    const [col , setCol] = useState([])
    const [page, setPage] = useState(1)

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
                                <div className="col-3 mb-2">
                                    <CollectionCard key={it.id} it={it}/>
                                </div>
                            )
                        })
                    }
                    <div className="d-flex col-btn">
                        <button onClick={() => setPage(pr => {
                            if(pr === 1) {
                                return 1
                            } else {
                               return  pr - 1
                            }
                        } )} className="pagination-btn"><img src={prev} alt=""/> </button>
                        {pageArray.map((it,idx) => {
                            return (
                                <button onClick={() =>setPage(idx+ 1) } className={ page === idx+1 ?  "pagination-btn pagination-btn-active" : "pagination-btn"  }>{idx+1}</button>
                            )
                        })}
                        <button  onClick={() => setPage(pr => {
                            if(pageArray.length <= pr) {
                                return 4
                            } else {
                                return  pr + 1
                            }})} className="pagination-btn"><img src={next} alt=""/></button>
                    </div>

                </div>



            </div>
        </section>
    );
};

export default Collection;