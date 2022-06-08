import React, {useEffect, useState} from 'react';
import {useSelector} from "react-redux";
import axios from "axios";
import CollectionCard from "../../components/CollectionCard/CollectionCard";

const Collection = () => {
    const [col , setCol] = useState([])

    useEffect(() => {
        axios("http://localhost:3000/collection")
            .then(({data}) => setCol(data))
    },[])



    return (
        <section className="collection">
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

                </div>
            </div>
        </section>
    );
};

export default Collection;