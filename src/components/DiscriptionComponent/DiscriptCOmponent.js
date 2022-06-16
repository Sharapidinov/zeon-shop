import React from 'react';
import {useState} from "react";

const DiscriptComponent = ({it}) => {
    const [toggleDisc, setToggleDisc] = useState(true)
    return (
        <>
            <div className={toggleDisc ?"news-content-text news-content-disc position-relative" : "news-content-text relative" }>
                {it?.discription}
                {toggleDisc && <div className="gradient"></div>}
            </div>
            <button onClick={() => setToggleDisc(!toggleDisc)} className="news-content-disc-btn" >{toggleDisc ? "Читать полностью" : "Скрыть"}</button>

        </>
    );
};

export default DiscriptComponent;