import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";

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

            <div className="mt-4 text-center text-sm">
              <span className="text-muted-foreground">
                Don't have an account?{" "}
              </span>
              <Link
                to="/signup"
                className="text-primary font-medium hover:underline"
              >
                Sign up
              </Link>
            </div>
          </CardContent>
        </Card>

        {/* Features Preview */}
        <div className="mt-8 text-center">
          <p className="text-sm text-zinc-600 mb-4">
            Join thousands using AI-powered homeopathy
          </p>
          <div className="flex justify-center gap-6 text-xs text-zinc-500">
            <div className="flex items-center gap-1">
              <span>✓</span>
              <span>24/7 Access</span>
            </div>
            <div className="flex items-center gap-1">
              <span>✓</span>
              <span>Personalized Care</span>
            </div>
            <div className="flex items-center gap-1">
              <span>✓</span>
              <span>Natural Remedies</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
