
import './App.css';
import './LoginComponent.jsx'
import LoginComponent from './LoginComponent.jsx';
import {Routes, Route, useNavigate, useLocation} from 'react-router-dom';
import Header from './Header.jsx';
import { useEffect } from 'react';
import { loginAction, pendingFalse } from './slices/userReducer.js';
import { useDispatch, useSelector } from 'react-redux';
import { get_request } from './send_request.js';
import Profile from './Profile.jsx';

function App() {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const is_authenticated = useSelector(state=>state.user.is_authenticated);
  const isUserDataPending = useSelector(state=>state.user.is_pending);
  
  useEffect(()=>{
    // Redirect to /login if user is not authenticated. Only if user's data from server is recieved
    if(location.pathname !== '/login' && !is_authenticated && !isUserDataPending) {
      navigate('/login');
    }
    // Redirect to /profile if user is authenticated
    if(location.pathname === '/login' && is_authenticated) {
      navigate('/profile');
    }
  },[location, isUserDataPending]);

  useEffect(()=>{
    async function inner(){
        let _data = await (await get_request('http://localhost:3001/login/')).json();
        if(_data.is_authenticated) {
            dispatch(loginAction({
              name:_data.username,
              email:_data.email
            }));
        }
        else {
          dispatch(pendingFalse());
        }
    };inner();
  }, []);

  return (
    <>
      <Header/>
      <div className='center-content'>
        <Routes>
          <Route path='/' element={<h1>home</h1>} />
          <Route path='/login' element={<LoginComponent/>} />
          <Route path='/profile' element={<Profile/>}/>
        </Routes>
      </div>
    </>
  );
}

export default App;
