import React, {useState} from "react";
import {Route, Routes} from "react-router-dom"
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



function App() {
    const [toggleApplication, setToggleApplication] = useState(false)



    return (
        <div className="App">
            <Header toggleApplication={toggleApplication} setToggleApplication={setToggleApplication} />
           <Routes>
            <Route path={"/"} element={<Main/>}/>
            <Route path={":name/:id"} element={<Product/>}/>
            <Route path={"/about-us"} element={<AboutUs/>}/>
            <Route path={"/news"} element={<News/>}/>
            <Route path={"/help"} element={<Help/>}/>
            <Route path={"/selected"} element={<Selected/>}/>
            <Route path={"/cart"} element={<Cart/>}/>
            <Route path={"/collection"} element={<Collection/>}/>
            <Route path={"/collection/:name/:id"} element={<ColectionS/>}/>
            <Route path={"/PublicOffer"} element={<PublicOffer/>}/>
           </Routes>
            <Footer/>
                <ModalMenue toggleApplication={toggleApplication} setToggleApplication={setToggleApplication} />
        </div>
    );
}

export default App;
