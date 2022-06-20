import React, {useEffect, useState} from "react";
import {Route, Routes, useLocation} from "react-router-dom"
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import Main from "./pages/Main/Main";
import Product from "./pages/Product/Product";
import AboutUs from "./pages/AboutUs/AboutUs";
import News from "./pages/News/News";
import Help from "./pages/Help/Help";
import Selected from "./pages/Selected/Selected";
import Cart from "./pages/cart/Cart";
import Collection from "./pages/collection/Collection";
import ColectionS from "./pages/ColectionS/ColectionS";
import ModalMenue from "./components/ModalMenue/ModalMenue";
import PublicOffer from "./pages/PublicOffer/PublicOffer";
import SearchPage from "./pages/SearchPage/SearchPage";
import BreadCrums from "./components/Breadcrums/BreadCrums";
import Reg from "./pages/Reg/Reg";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import {useSelector} from "react-redux";
import {useAuth} from "./firebazeConfig";



function App() {
    const [toggleApplication, setToggleApplication] = useState(false)
    const {pathname} = useLocation()


    useEffect(() => {
            window.scrollTo(0, 0)

     }, [pathname])


    useAuth()
    return (
        <div className="App">
            <Header toggleApplication={toggleApplication} setToggleApplication={setToggleApplication} />
           <Routes>
            <Route path={"/"} element={<Main toggleApplication={toggleApplication} setToggleApplication={setToggleApplication} />}/>
            <Route path={":name/:id"} element={<Product/>}/>
            <Route path={"/about-us"} element={<AboutUs/>}/>
            <Route path={"/news"} element={<News/>}/>
            <Route path={"/help"} element={<Help/>}/>
            <Route path={"/selected"} element={<Selected/>}/>
            <Route path={"/cart"} element={<Cart/>}/>
            <Route path={"/collection"} element={<Collection/>}/>
            <Route path={"/collection/:name/:id"} element={<ColectionS/>}/>
            <Route path={"/PublicOffer"} element={<PublicOffer/>}/>
            <Route path={"/search"} element={<SearchPage/>}/>
            <Route path={"/register"} element={<Reg/>}/>
           </Routes>
            <Footer/>

        </div>
    );
}

export default App;
