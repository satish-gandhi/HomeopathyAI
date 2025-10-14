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
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const userDataString = localStorage.getItem("currentUser");

    if (userDataString) {
      const userData = JSON.parse(userDataString);
      const savedusername = userData.username;
      const savedpassword = userData.password;

      if (username === savedusername && password === savedpassword) {
        console.log("Authenticated!");
        navigate("/home");
      } else {
        setError("Invalid username or password");
      }
    } else {
      setError("No account found. Please sign up first.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-zinc-50 to-white flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        {/* Logo/Brand */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-4">
            <span className="text-4xl">🌿</span>
            <h1 className="text-3xl font-bold text-zinc-900">HomeopathyAI</h1>
            <Badge variant="secondary" className="ml-2">
              Beta
            </Badge>
          </div>
          <p className="text-zinc-600">Natural healing powered by AI</p>
        </div>

        {/* Login Card */}
        <Card>
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl text-center">Welcome back</CardTitle>
            <CardDescription className="text-center">
              Enter your credentials to access your account
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <div className="bg-destructive/10 text-destructive text-sm p-3 rounded-md border border-destructive/20">
                  {error}
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="username">Username</Label>
                <Input
                  id="username"
                  type="text"
                  placeholder="johndoe"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password">Password</Label>
                  <Link
                    to="#"
                    className="text-xs text-primary hover:underline"
                  >
                    Forgot password?
                  </Link>
                </div>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              <Button type="submit" className="w-full">
                Sign In
              </Button>
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
