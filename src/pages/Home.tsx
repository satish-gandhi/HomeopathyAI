import React ,{useState,useEffect} from "react";
import { useNavigate } from "react-router-dom";

function Home() {
    const [username, setUsername] = useState('')
    const navigate=useNavigate()
    useEffect(() => {
        const userDataString = localStorage.getItem('currentUser')
        if (userDataString) {
        const userData = JSON.parse(userDataString)
        setUsername(userData.username)
    }
    }, []);
    
    const LogoutHandle= () => {
            localStorage.removeItem('currentUser')
            navigate('/login')
        }

    return(
        <div>
            <h1> Home Page!</h1>
            <h2> Welcome {username} </h2>
            <button type="button" onClick={LogoutHandle}> Logout</button>
        </div>
    );
}

export default Home;
