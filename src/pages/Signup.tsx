import React, {useState} from "react";

function Signup() {
    
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const userData = {
        username: username,
        email: email,
        password: password
    };
    // const userDataString=JSON.stringify(userData);
    // localStorage.setItem('currentUser', userDataString);
    // console.log('User Data stored to local storage');
    try{
        const response = await fetch('http://localhost:5000/signup', {
            method : 'POST',
            headers : {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userData)
        });
        const data = await response.json();
        console.log('Server Response', data)
    }
    catch (error){
        console.error('Error', error);
    }
    console.log('User Data: ', userData);
    setUsername('');
    setEmail('');
    setPassword('');
    }
    
    return (
        <div>
        <h1>Signup Page</h1>
       <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)}/>
        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)}/>
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)}/>
        <button type="submit"> Submit </button>
       </form>

        </div>
    );
}

export default Signup;
