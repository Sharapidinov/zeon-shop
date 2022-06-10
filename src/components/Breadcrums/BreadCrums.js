import React from 'react';
import {Link, useLocation, useParams} from "react-router-dom";

const BreadCrums = ({name}) => {


    return (
        <div className="breadcrumb-box">
            <div className="container">
                <div className="breadcrumb align-items-center mb-0">
                    <p className="breadcrumb-item mb-0"><Link className="text-decoration-none" style={{color:"#393939"}} to={"/"}>Главная</Link></p>
                    <p className="breadcrumb-item active mb-0" >{name}</p>
                </div>
            </div>

        </div>
    );
};

export default BreadCrums;