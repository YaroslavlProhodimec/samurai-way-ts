import ReactDOM from "react-dom";
import {BrowserRouter, HashRouter} from "react-router-dom";
import App from "./App";
import "./index.css";
import store from "./redux/redux-store";
import React from "react";

import {Provider} from "react-redux";
import SamuraiJSApp from "./App";

let rerenderEntireTree = (state: any) => {


    ReactDOM.render(
        <SamuraiJSApp/>,
        document.getElementById('root')
    );
}
rerenderEntireTree(store.getState());
