import React, {useEffect, useState} from 'react';
import axios from "axios";
import CollectionCard from "../../components/CollectionCard/CollectionCard";
import BreadCrums from "../../components/Breadcrums/BreadCrums";
import ProductCard from "../../components/ProductCard/productCard";

const Collection = () => {
    const [col , setCol] = useState([])
    const [page, setPage] = useState(0)
    const[newP, setNewP] = useState([])
    const [totalCount, setTotalCount] = useState(0)
    const pageArray = Array(totalCount/8).fill(0)


    useEffect(() => {
        axios(`http://localhost:3000/collection?_page=${page}&_limit=8`)
            .then((res) => {
                setCol(res.data)
                setTotalCount(res.headers["x-total-count"])
            })

        axios("http://localhost:3000/new?&_limit=5").then(({data}) => setNewP(data))


    },[page])






    return (
        <section className="collection">
            <BreadCrums name={"Коллекции"}/>
            <div className="container">
                <div className="collection-title">
                    Коллекции
                </div>

                <div className="row">
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
                                <button onClick={() =>setPage(idx+ 1) } className="pagination-btn">{idx+1}</button>
                            )
                        })}
                    </div>

                </div>

                <div className="interesting">
                    <div className="interesting-title">Новинки</div>
                    <div className="row">
                        {newP?.map(it => {
                            return (
                                <div key={it.id + it?.color[0]} className="col-5">
                                    <ProductCard  it={it} toggle={!it.selected} name={it.id > 8 ?"new" :"bestsellers"}/>
                                </div>
                            )
                        })}
                    </div>

                </div>

            </div>
        </section>
    );
};

export default Collection;