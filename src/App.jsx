
import './App.css';
import './LoginComponent.jsx'
import LoginComponent from './LoginComponent.jsx';
import {Routes, Route} from 'react-router-dom';
import Header from './Header.jsx';

function App() {
  return (
    <>
      <Header/>
      <div className='content'>
        <Routes>
          <Route path='/' element={<h1>home</h1>} />
          <Route path='/login' element={<LoginComponent/>} />
        </Routes>
      </div>
    </>
  );
}

export default App;
