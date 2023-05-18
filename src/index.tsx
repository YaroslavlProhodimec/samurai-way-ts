import ReactDOM from "react-dom";
import {BrowserRouter, HashRouter} from "react-router-dom";
import App from "./App";
import "./index.css";
import store from "./redux/redux-store";
import React from "react";

import {Provider} from "react-redux";

let rerenderEntireTree = (state: any) => {


    ReactDOM.render(
        <BrowserRouter>
            <Provider store={store} >
                <App/>
            </Provider>
        </BrowserRouter>,
        document.getElementById('root')
    );
}
rerenderEntireTree(store.getState());
