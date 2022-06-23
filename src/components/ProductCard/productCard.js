import React, {useState} from 'react';
import {Link} from "react-router-dom";
import heart from "../../icons/heart.svg"
import fullHeart from "../../icons/full-heart.svg"
import {useDispatch, useSelector} from "react-redux";

const ProductCard = ({name, it, toggle = false}) => {
    const find = JSON.parse(localStorage.getItem("selected"))?.find(selected => selected.id === it.id)
    const findCart = JSON.parse(localStorage.getItem("cart"))?.find(selected => selected.id === it.id)
    const [add, setAdd] = useState(toggle || find?.selected)
    const dispatch = useDispatch()
    const [moveBlock, setMoveBlock] = useState("")
    const [toggleHover, setToggleHover] = useState(false)
    const [img, setImg] = useState(it?.image)
    const {user} = useSelector(s => s)


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

    const handleOnHover = (e) => {
        const mouseX = e.nativeEvent.offsetX
        const clientWith = e.target.clientWidth
        const cardWith = Math.ceil(clientWith / 4)
        // console.log(cardWith, mouseX)
        setMoveBlock(mouseX + 5)
        // console.log(moveBlock)
        setToggleHover(true)

        if (mouseX > 1 && cardWith > mouseX) {
            setMoveBlock(45)
            setImg(it?.image)
        }
        if (mouseX > cardWith && cardWith * 2 > mouseX) {
            setImg("https://cdn.discordapp.com/attachments/978515025473966083/978593185792147456/Rectangle_491_4.png")
        }
        if (mouseX > cardWith * 2 && cardWith * 3 > mouseX) {
            setImg("https://cdn.discordapp.com/attachments/978515025473966083/978593186136088576/Rectangle_491_3.png")
        }
        if (mouseX > cardWith * 3 && cardWith * 4 > mouseX) {
            setImg("https://cdn.discordapp.com/attachments/978515025473966083/978593186463240232/Rectangle_491_2.png")
            setMoveBlock(210)
        }
    }


    return (
        <>
            {!!it && <div onMouseLeave={() => {
                setToggleHover(false);
                setImg(it?.image)
            }} style={toggleHover ? {border: `1px solid #EFE4CF`} : {}}  key={it.id} className="product-card">

                {
                    !!it.discount ? <>
                            <div className="discount"></div>
                            <p className="discount-num">{it?.discount}%</p> </>
                        : <></>

                }
                {toggleHover && <div className="move-block" style={{left: `${moveBlock - 20}px`}}></div>}
                {user.id && toggleHover &&
                    <button onClick={() => addToSelect(it)} className="heart-btn"><img src={!add ? heart : fullHeart}
                                                                                       alt=""/></button>}
                {add &&
                    <button onClick={() => addToSelect(it)} className="heart-btn"><img src={!add ? heart : fullHeart}
                                                                                       alt=""/></button>}

                <Link to={`/${name}/${it?.id}`}> <img onMouseMove={e => {
                    handleOnHover(e)
                }} className="product-card-img mb-2 " src={img} alt=""/> </Link>


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
                                    <div style={findCart?.color === color? {border : "1px solid #E7E7E7" , borderRadius : "30px"} : {}}  className="color-box">
                                        <div key={color} className="colors"
                                             style={{backgroundColor: `${color}`, opacity: "0.6"}}></div>
                                    </div>
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