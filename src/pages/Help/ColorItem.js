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
        <div onClick={() => toggleChooseColor(color)} style={chooseColor ? {border:" 1px solid #858F9B"} : {}} className="color-box">
            <div onClick={() => checkColor(color)} className="colors"
                 style={{backgroundColor: `${color}`,opacity: "0.6"}}></div>
        </div>
    );
};

export default ColorItem;