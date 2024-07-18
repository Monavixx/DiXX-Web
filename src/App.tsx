
import './App.css';
import LoginComponent from './components/LoginComponent.tsx';
import {Routes, Route, useLocation, useNavigate} from 'react-router-dom';
import Header from './components/Header.tsx';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Profile from './components/Profile.tsx';
import SignUpComponent from './components/SignUpComponent.tsx';
import YourSetsComponent from './components/YourSetsComponent.tsx';
import SetComponent from './components/SetComponent.tsx';
import { updateLocation } from './slices/locationSlice.ts';
import {useDidUpdateEffect} from './functions/useDidUpdateEffects.ts';
import CreateNewSetComponent from './components/CreateNewSetComponent.tsx';
import EditSetComponent from './components/EditSetComponent.tsx';
import FriendsComponent from './components/friends/FriendsComponent.tsx';
import { UserActions } from './slices/userSlice.ts';
import { AppDispatch } from './store.ts';

function App() {
  const dispatch = useDispatch();
  const location = useLocation();
  const locationState = useSelector<any, string>(state => state.location.navigatePathname);
  const navigate = useNavigate();
  
  useDidUpdateEffect(()=>{
    dispatch(updateLocation(location.pathname));
  },[location, dispatch]);

  useDidUpdateEffect(()=> {
    navigate(locationState);
  }, [locationState]);

  return (
    <>
      <AutoLoginComponent/>
      <Header/>
      <div className="all-content">
        <div className="left-content">

        </div>
        <div className='center-content'>
          <Routes>
            <Route path='/' element={<h1>home</h1>} />
            <Route path='/login' element={<LoginComponent/>} />
            <Route path='/profile' element={<Profile/>}/>
            <Route path='/signup' element={<SignUpComponent/>}/>
            <Route path='/sets/your' element={<YourSetsComponent/>}/>
            <Route path='/set/:id' element={<SetComponent/>}/>
            <Route path='/set/:id/edit' element={<EditSetComponent/>}/>
            <Route path='/create-new-set' element={<CreateNewSetComponent/>} />
            <Route path='/friends' element={<FriendsComponent/>} />
            <Route path='/404' element={'404'}/>
          </Routes>
        </div>
        <div className="right-content">
          
        </div>
      </div>
    </>
  );
}


function AutoLoginComponent() {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(()=>{
    dispatch(UserActions.checkIfLoggedIn());
  }, [dispatch]);
  return null;
}

export default App;
