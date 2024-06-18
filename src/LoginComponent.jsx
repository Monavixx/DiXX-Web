import {useState, useEffect, useRef} from 'react';
import {post_request, get_request} from './send_request';

function LoginComponent() {
    let [data, setData] = useState(null);
    let [isLoading, setIsLoading] = useState(false);
    let username = useRef(null);
    let password = useRef(null);

    useEffect(()=>{
        async function inner(){
            setIsLoading(true);
            let _data = await (await get_request('http://localhost:3001/login/')).json();
            setIsLoading(false);
            setData(_data);
            console.log(document.cookie);
        };inner();
    }, []);

    function login() {
        async function inner() {
            setIsLoading(true);
            let _data = post_request('http://localhost:3001/login/',
                {username: username.current.value, password: password.current.value});

            setData(await (await _data).json());
            setIsLoading(false);
        }
        inner();        
    }
    if(isLoading)return (<p>Loading...</p>);
    
    return (
        <div className="logincomponent">
            {data?.success ? 
                <div>
                    <p>auth</p>
                    <p>username: {data?.username}</p>
                    <p>email: {data?.email}</p>
                </div>
            : 
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