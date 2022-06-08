import React, {useState} from 'react';
import {Link} from "react-router-dom";
import heart from "../../icons/heart.svg"
import fullHeart from "../../icons/full-heart.svg"
import {useDispatch} from "react-redux";

const ProductCard = ({name, it, toggle = false}) => {
    const find = JSON.parse(localStorage.getItem("selected"))?.find(selected => selected.id === it.id)
    const [add, setAdd] = useState(toggle || find?.selected)
    const dispatch = useDispatch()

    const addToSelect = (it) => {
        it.name = name
        it.selected = true
        const items = localStorage.getItem("selected")
        let newItems = items ? JSON.parse(items) : []
        if (find) {
            newItems = newItems.filter(sel => sel.id !== it.id)
            setAdd(false)
        } else {
            newItems.push(it)
            setAdd(true)
        }
        localStorage.setItem("selected", JSON.stringify(newItems))
        dispatch({type: "UPDATE_SELECTED", selected: newItems})
    }



    return (
        <>
            {!!it && <div key={it.id} className="product-card">

                {
                    !!it.discount ? <><div className="discount"></div>
                            <p className="discount-num">{it?.discount}%</p> </>
                    : <></>

                }

                <button onClick={() => addToSelect(it)} className="heart-btn"><img src={!add ? heart : fullHeart} alt=""/></button>

                <Link to={`/${name}/${it?.id}`}> <img className="product-card-img mb-2 " src={it?.image} alt=""/> </Link>


                <div className="ps-2">
                    <div className="product-card-title">
                        {it?.title}
                    </div>
                    <div className="product-card-price">
                        {it?.price} p
                    </div>
                    <div className="product-card-size">
                        Размер: {it?.size}
                    </div>
                    <div className="product-card-colors ">
                        <div className="d-flex">
                            {it?.color?.map(color => {
                                return (
                                    <div key={color} className="colors" style={{backgroundColor: `${color}`}}></div>
                                )
                            })}
                        </div>
                    </div>
                </div>
            </div>}
        </>
    );
};

export default ProductCard;