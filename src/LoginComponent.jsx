import {useState, useEffect, useRef} from 'react';
import Cookies from 'js-cookie';

function LoginComponent() {
    let [data, setData] = useState(null);
    let username = useRef(null);
    let password = useRef(null);

    useEffect(()=>{
        async function inner(){
            let _data = await (await fetch('http://localhost:3001/login/?format=json', { 
                headers:{
                    "Access-Control-Allow-Origin": '*',
                },
                credentials:'include'
            })).json();
            setData(_data);
            console.log(document.cookie);
        };inner();
    }, []);

    function login() {
        async function inner() {
            let _data = await fetch('http://localhost:3001/login/', {
                method:'POST',
                credentials:'include',
                headers: {
                    'content-type': 'application/json',
                    "Accept": 'application/json',
                    "X-CSRFToken": Cookies.get('csrftoken'),
                    "Access-Control-Allow-Origin": '*',
                    "Cookie": document.cookie
                },
                body: JSON.stringify({username: username.current.value, password: password.current.value})
            });

            setData(await _data.json());
        }
        inner();
        console.log(document.cookie);
        
    }
    
    return (
        <div className="logincomponent">
            {data?.success ? "auth" : 
                <div className="form">
                    <input ref={username} type="text" placeholder='username'/>
                    <input ref={password} type="password" placeholder='password'/>
                    <button onClick={login}>login</button>
                </div>
            }
            <br />
            {data?.message}
        </div>
    );
}

export default LoginComponent;