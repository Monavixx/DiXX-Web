
import './App.css';
import LoginComponent from './components/LoginComponent.jsx';
import {Routes, Route, useLocation} from 'react-router-dom';
import Header from './components/Header.jsx';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import Profile from './components/Profile.jsx';
import SignUpComponent from './components/SignUpComponent.jsx';
import YourSetsComponent from './components/YourSetsComponent.jsx';
import SetComponent from './components/SetComponent.jsx';
import { API } from './API.js';
import { updateLocation } from './slices/locationReduces.js';
import {useDidUpdateEffect} from './functions/useDidUpdateEffects.js';

function App() {
  const dispatch = useDispatch();
  const location = useLocation();
  
  useDidUpdateEffect(()=>{
    dispatch(updateLocation());
  },[location, dispatch]);

  return (
    <>
      <AutoLoginComponent/>
      <Header/>
      <div className='center-content'>
        <Routes>
          <Route path='/' element={<h1>home</h1>} />
          <Route path='/login' element={<LoginComponent/>} />
          <Route path='/profile' element={<Profile/>}/>
          <Route path='/signup' element={<SignUpComponent/>}/>
          <Route path='/sets/your' element={<YourSetsComponent/>}/>
          <Route path='/sets/:id' element={<SetComponent/>}/>
        </Routes>
      </div>
      
    </>
  );
}


function AutoLoginComponent() {

  useEffect(()=>{
    async function inner(){
        await API.checkForLogin();
    };
    inner();
  }, []);
  return null;
}

export default App;
