import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {BrowserRouter} from 'react-router-dom';
import {configureStore} from '@reduxjs/toolkit';
import userReducer from './slices/userReducer';
import {Provider} from 'react-redux';

let store = configureStore({
  reducer: {
    user: userReducer
  }
});

export let rootdom = document.getElementById('root');

const root = ReactDOM.createRoot(rootdom);

root.render(
    <BrowserRouter>
      <Provider store={store}>
        <App />
      </Provider>
    </BrowserRouter>
);
