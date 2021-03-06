import React from 'react';
import arrow from "../../icons/arrow-right.svg";
import {useNavigate} from "react-router";

const CollectionCard = ({it}) => {
    const nav = useNavigate()
    return (


                <div className="collection-product-card">
                    <img src={it?.image} alt=""/>
                    <p>{it?.title}</p>
                    <button onClick={() => nav(`/collection/${it.title}/${it.id}`)}> Смотреть все <img src={arrow} alt=""/> </button>
                </div>

    );
};

export default CollectionCard;