import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
function Login() {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const navigate=useNavigate()
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        
        const userDataString = localStorage.getItem('currentUser');
        
        if (userDataString) {
            const userData = JSON.parse(userDataString);
        const savedusername = userData.username;
        const savedpassword = userData.password;
            if (username===savedusername && password===savedpassword){
                console.log('Authenticated!')
                navigate('/home')
            }
            else {
                console.log('Wrong Username or Password')
            }
        }
        else {
            console.log('User does not exist!')
        }
    }
    return(
        <div>
            <h1> Login Page</h1>
            <form onSubmit={handleSubmit}>
                <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)}/>
                <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)}/>
                <button type='submit'> Submit </button>
            </form>

        </div>
    );
}
export default Login;
