import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
// import {BrowserRouter} from 'react-router-dom'
import * as serviceWorker from './serviceWorker';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter} from "react-router-dom"
import { createBrowserHistory } from "history";

const history = createBrowserHistory({
        basename: process.env.PUBLIC_URL,
      });
ReactDOM.render(
  <BrowserRouter history={history}
  basename={process.env.PUBLIC_URL}>
    <App />
     </BrowserRouter>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
