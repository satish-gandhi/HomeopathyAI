import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
function Login() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const navigate=useNavigate()
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        try{
            const response = await fetch('http://localhost:5000/login',{
                method: 'POST',
                headers: { 'Content-Type': 'application/json'},
                body: JSON.stringify({email, password})
            });
            const data = await response.json()
            if (response.ok) {
                console.log('Login Success', data);
                navigate('/home');
            }
            else{
                console.log('Login failed: ', data.message);
            }
            
        }
        catch(error){
                console.error('Error', error);
            }

        
    }
    return(
        <div>
            <h1> Login Page</h1>
            <form onSubmit={handleSubmit}>
                <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)}/>
                <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)}/>
                <button type='submit'> Submit </button>
            </form>

        </div>
    );
}
export default Login;
