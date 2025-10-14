import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

function Home() {
  const [username, setUsername] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const verifyUser = async () => {
      const userDataString = localStorage.getItem("currentUser");

      if (!userDataString) {
        setIsLoading(false);
        return;
      }

      try {
        const userData = JSON.parse(userDataString);
        const response = await fetch("http://localhost:5000/verify-user", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email: userData.email }),
        });

        if (response.ok) {
          const data = await response.json();
          setUsername(data.user.username);
          setIsLoggedIn(true);
        } else {
          // User not found in database, clear localStorage
          localStorage.removeItem("currentUser");
          setIsLoggedIn(false);
        }
      } catch (error) {
        console.error("Error verifying user:", error);
        localStorage.removeItem("currentUser");
        setIsLoggedIn(false);
      } finally {
        setIsLoading(false);
      }
    };

    verifyUser();
  }, []);

  const LogoutHandle = () => {
    localStorage.removeItem("currentUser");
    navigate("/login");
  };

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  const features = [
    {
      title: "AI-Powered Diagnosis",
      description:
        "Get accurate homeopathic remedy recommendations based on your symptoms using advanced AI algorithms.",
      icon: "🧠",
    },
    {
      title: "Personalized Treatment",
      description:
        "Receive customized treatment plans tailored to your unique constitution and health history.",
      icon: "💊",
    },
    {
      title: "24/7 Consultation",
      description:
        "Access expert homeopathic guidance anytime, anywhere with our AI assistant.",
      icon: "🕐",
    },
    {
      title: "Natural Healing",
      description:
        "Embrace holistic wellness with natural remedies that work with your body's healing power.",
      icon: "🌿",
    },
    {
      title: "Track Progress",
      description:
        "Monitor your health journey with detailed insights and progress tracking.",
      icon: "📊",
    },
    {
      title: "Evidence-Based",
      description:
        "Benefit from remedies backed by centuries of homeopathic practice and modern research.",
      icon: "📚",
    },
  ];

  const stats = [
    { value: "10K+", label: "Active Users" },
    { value: "50K+", label: "Consultations" },
    { value: "95%", label: "Satisfaction Rate" },
    { value: "24/7", label: "Support" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-zinc-50 to-white">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <span className="text-2xl">🌿</span>
            <h1 className="text-2xl font-bold text-zinc-900">HomeopathyAI</h1>
            <Badge variant="secondary" className="ml-2">
              Beta
            </Badge>
          </div>
          <div className="flex items-center gap-4">
            {isLoggedIn && (
              <>
                <Avatar>
                  <AvatarFallback className="bg-zinc-900 text-white">
                    {getInitials(username)}
                  </AvatarFallback>
                </Avatar>
                <div className="hidden sm:block">
                  <p className="text-sm font-medium">{username}</p>
                </div>
                <Button onClick={LogoutHandle} variant="outline">
                  Logout
                </Button>
              </>
            )}
            {!isLoggedIn && !isLoading && (
              <div className="flex items-center gap-2">
                <Button onClick={() => navigate("/login")} variant="outline">
                  Sign In
                </Button>
                <Button onClick={() => navigate("/signup")}>
                  Sign Up
                </Button>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16 text-center">
        {isLoggedIn && (
          <Badge className="mb-4" variant="outline">
            Welcome back, {username}!
          </Badge>
        )}
        <h2 className="text-5xl font-bold text-zinc-900 mb-6">
          Your Path to Natural Healing
        </h2>
        <p className="text-xl text-zinc-600 mb-8 max-w-2xl mx-auto">
          Experience personalized homeopathic care powered by artificial
          intelligence. Get started with your consultation today.
        </p>
        <div className="flex gap-4 justify-center">
          <Button size="lg" className="text-lg px-8">
            Start Consultation
          </Button>
          <Button size="lg" variant="outline" className="text-lg px-8">
            View History
          </Button>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-zinc-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {stats.map((stat, index) => (
              <div key={index}>
                <p className="text-4xl font-bold mb-2">{stat.value}</p>
                <p className="text-zinc-400">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h3 className="text-3xl font-bold text-zinc-900 mb-4">
            Why Choose HomeopathyAI?
          </h3>
          <p className="text-zinc-600 max-w-2xl mx-auto">
            Combining traditional homeopathy with cutting-edge AI technology to
            deliver the best natural healthcare experience.
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <Card
              key={index}
              className="hover:shadow-lg transition-shadow duration-300"
            >
              <CardHeader>
                <div className="text-4xl mb-2">{feature.icon}</div>
                <CardTitle>{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  {feature.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-zinc-50 py-16">
        <div className="container mx-auto px-4 text-center">
          <Card className="max-w-3xl mx-auto border-2">
            <CardHeader>
              <CardTitle className="text-3xl">
                Ready to Experience Natural Healing?
              </CardTitle>
              <CardDescription className="text-lg">
                Start your personalized homeopathic journey today with our
                AI-powered consultation system.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button size="lg" className="text-lg px-12">
                Get Started Now
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t bg-white py-8">
        <div className="container mx-auto px-4 text-center text-zinc-600">
          <p>&copy; 2025 HomeopathyAI. All rights reserved.</p>
          <p className="text-sm mt-2">
            Natural healing powered by artificial intelligence
          </p>
        </div>
      </footer>
    </div>
  );
}

export default Home;
