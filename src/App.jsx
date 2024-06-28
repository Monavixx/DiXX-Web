
import './App.css';
import LoginComponent from './components/LoginComponent.jsx';
import {Routes, Route, useLocation, useNavigate} from 'react-router-dom';
import Header from './components/Header.jsx';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Profile from './components/Profile.jsx';
import SignUpComponent from './components/SignUpComponent.jsx';
import YourSetsComponent from './components/YourSetsComponent.jsx';
import SetComponent from './components/SetComponent.jsx';
import { API } from './API.js';
import { updateLocation } from './slices/locationReduces.js';
import {useDidUpdateEffect} from './functions/useDidUpdateEffects.js';
import CreateNewSetComponent from './components/CreateNewSetComponent.jsx';
import EditSetComponent from './components/EditSetComponent.jsx';
import AddCardComponent from './components/AddCardComponent.jsx';

function App() {
  const dispatch = useDispatch();
  const location = useLocation();
  const locationState = useSelector(state=> state.location.navigatePathname);
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
            <Route path='/set/:id/add-card' element={<AddCardComponent/>}/>
            <Route path='/create-new-set' element={<CreateNewSetComponent/>} />
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

  useEffect(()=>{
    API.checkForLogin();
  }, []);
  return null;
}

export default App;
