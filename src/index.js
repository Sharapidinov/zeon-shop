import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from "react-redux";
import 'bootstrap/dist/css/bootstrap.css';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import './index.css';
import App from './App';
import {store} from "./redux";
import {BrowserRouter} from "react-router-dom";


ReactDOM.render(
  <React.StrictMode>
   <Provider store={store}>
      <BrowserRouter>
          <App />
      </BrowserRouter>
   </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);


