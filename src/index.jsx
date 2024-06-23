import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {BrowserRouter} from 'react-router-dom';
import {configureStore} from '@reduxjs/toolkit';
import userReducer from './slices/userReducer';
import {Provider} from 'react-redux';
import ReloadProvider, { GlobalFunctionComponent } from './components/ReloadContext';
import locationReducer from './slices/locationReduces';

export const store = configureStore({
  reducer: {
    user: userReducer,
    location: locationReducer
  }
});

export let rootdom = document.getElementById('root');

const root = ReactDOM.createRoot(rootdom);

root.render(
    <ReloadProvider>
      { (key)=> 
      <>
        <BrowserRouter>
          <Provider store={store}>
            <App key={key}/>
          </Provider>
        </BrowserRouter>
        <GlobalFunctionComponent/>
      </>
      }
    </ReloadProvider>
);
