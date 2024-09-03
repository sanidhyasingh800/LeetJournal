import React from 'react';
import ReactDOM from 'react-dom';

import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import {thunk, withExtraArgument} from 'redux-thunk';
import reducers from './reducers';

import App from './App';
import  './index.css';
// configure the shared global app state
// compose or connect the thunk middleware
//    this allows us to perform async functions such as back end API calls 
const store = createStore(reducers, compose(applyMiddleware(thunk)));



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store = {store}>
  <React.StrictMode>
    <App />
  </React.StrictMode>
  </Provider>
);