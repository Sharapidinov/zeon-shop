import React, {useEffect, useState} from 'react';
import axios from "axios";
import {useSelector} from "react-redux";
import up from "../../icons/arrow-up.svg";
import down from "../../icons/arrow-down.svg";
import ProductCard from "../../components/ProductCard/productCard";
import heart from "../../icons/heart.svg";
import fullHeart from "../../icons/full-heart.svg";
import {Link} from "react-router-dom";

const Orders = () => {
    const [orders , setOrders] = useState([])
    const [selected, setSelected] = useState(null)

    const {user} = useSelector(s=> s)
    useEffect(() => {
        axios(`http://localhost:3000/application?uid=${user.id}` )
            .then(({data}) => setOrders(data))


    },[user])
    const toggle = (idx) => {
        if (selected === idx) {
            return setSelected(null)
        }
        setSelected(idx)
    }

    return (
       <section className="container ">
           <div className="orders">
                <div className="orders-title">Закакзы</div>
               <div className="row">
                   {
                       orders?.map((it,idx) => {
                           return (
                               <div  key={it.id} className="col-4">
                                   <div className="order-card-box">
                                       <div>Имя заказчика: <span>{it.name}</span></div>
                                       <div>Номер телефона: <span>{it.telNum}</span></div>
                                       <div>Сумма заказа: <span>{it.finalPayment}</span></div>
                                       <div>Колличество линеек: <span>{it.products.length} шт</span> </div>
                                       <div className="dash">Время получения заявки: <br/><span>{it.time}</span></div>
                                       <div key={idx}  className="order-accordion-conent-item">
                                           <div  onClick={() => toggle(idx)} className={`accordion-title`}>
                                              Подробнее . . .
                                           </div>
                                           <div className={selected === idx ? "accordion-content show" : "accordion-content"}>
                                               <div className="order-product-box">
                                                   {it.products.map(it => {
                                                       return (
                                                            <div className="order-product-col">
                                                                <div className="order-product-card">
                                                                    <img className="product-card-img mb-2 " src={it.image} alt=""/>
                                                                    <div className="ps-2 order-product-flex">
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
                                                                                <div className="color-box">

                                                                                    <div  className="colors"
                                                                                          style={{backgroundColor: `${it.color}`, opacity: "0.6"}}></div>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                       )
                                                   })}
                                               </div>
                                           </div>
                                       </div>
                                   </div>
                               </div>
                           )
                       })
                   }
               </div>
           </div>
       </section>
    );
};

export default Orders;