
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';

import store from './store/store';
import {Provider} from 'react-redux'
import { InApp } from './InApp';
store.subscribe(()=> console.log(store.getState()));  
ReactDOM.render(
  <Provider store={store}>
    <InApp />
  </Provider>,
  document.getElementById('root')
);

reportWebVitals();
