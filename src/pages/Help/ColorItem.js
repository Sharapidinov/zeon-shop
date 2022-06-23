import React from 'react';
import {useState} from "react";

const ColorItem = ({color, checkColor}) => {
    const [chooseColor, setChooseColor] = useState(false)
    const toggleChooseColor = (color) => {
        if (chooseColor === color) {
            return setChooseColor(false)
        }
        setChooseColor(color)
    }

    return (
        <div onClick={() => toggleChooseColor(color)}  className="color-box">
            <div onClick={() => checkColor(color)} className="colors"
                 style={{backgroundColor: `${color}`,opacity: "0.6"}}>
                <input type="radio" name="color" defaultChecked={color === "#73A39D"} id={color}/>
                <label htmlFor={color}></label>
            </div>

        </div>
    );
};

export default ColorItem;