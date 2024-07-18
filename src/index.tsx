import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import {BrowserRouter} from 'react-router-dom';
import {Provider} from 'react-redux';
import ReloadProvider, { GlobalFunctionComponent } from './components/ReloadContext.tsx';
import {store} from './store.ts';

export let rootdom = document.getElementById('root')!;

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
