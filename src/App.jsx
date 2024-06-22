
import './App.css';
import LoginComponent from './components/LoginComponent.jsx';
import {Routes, Route, useLocation} from 'react-router-dom';
import Header from './components/Header.jsx';
import { useEffect } from 'react';
import { loginAction, pending } from './slices/userReducer.js';
import { useDispatch } from 'react-redux';
import { get_request } from './functions/send_request.js';
import Profile from './components/Profile.jsx';
import SignUpComponent from './components/SignUpComponent.jsx';
import YourSetsComponent from './components/YourSetsComponent.jsx';
import SetComponent from './components/SetComponent.jsx';

function App() {
  const dispatch = useDispatch();
  const location = useLocation();

  useEffect(()=>{
    async function inner(){
        dispatch(pending(true));
        let _data = await (await get_request('login/')).json();
        if(_data.is_authenticated) {
            dispatch(loginAction({
              name:_data.username,
              email:_data.email
            }));
        }
        else {
          dispatch(pending(false));
        }
    };inner();
  }, [location]);

  return (
    <>
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

export default App;
