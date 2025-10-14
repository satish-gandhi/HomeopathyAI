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

function Dashboard() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const userDataString = localStorage.getItem("currentUser");
    if (userDataString) {
      try {
        const userData = JSON.parse(userDataString);
        setUsername(userData.username || userData.name || "User");
        setEmail(userData.email || "");
      } catch (error) {
        console.error("Error parsing user data:", error);
        navigate("/login");
      }
    } else {
      // Redirect to login if not authenticated
      navigate("/login");
    }
  }, [navigate]);

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

  const stats = [
    {
      title: "Total Consultations",
      value: "0",
      description: "Start your first consultation",
      icon: "💊",
      trend: "Get started",
    },
    {
      title: "Active Treatments",
      value: "0",
      description: "No ongoing treatments",
      icon: "🌿",
      trend: "Begin treatment",
    },
    {
      title: "Health Score",
      value: "—",
      description: "Complete profile to see score",
      icon: "📊",
      trend: "Update profile",
    },
    {
      title: "Days Active",
      value: "1",
      description: "Welcome to HomeopathyAI!",
      icon: "⭐",
      trend: "New member",
    },
  ];

  const quickActions = [
    {
      title: "Start Consultation",
      description: "Get AI-powered remedy recommendations",
      icon: "🧠",
      color: "bg-zinc-900 text-white hover:bg-zinc-800",
    },
    {
      title: "View Treatment Plan",
      description: "See your personalized healing journey",
      icon: "📋",
      color: "bg-white border-2 hover:bg-zinc-50",
    },
    {
      title: "Health Profile",
      description: "Update your symptoms and history",
      icon: "👤",
      color: "bg-white border-2 hover:bg-zinc-50",
    },
    {
      title: "Learning Hub",
      description: "Explore homeopathic remedies",
      icon: "📚",
      color: "bg-white border-2 hover:bg-zinc-50",
    },
  ];

  const recentActivity = [
    {
      title: "Account Created",
      description: "Welcome to HomeopathyAI!",
      time: "Just now",
      icon: "🎉",
    },
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
            <Avatar>
              <AvatarFallback className="bg-zinc-900 text-white">
                {getInitials(username || "User")}
              </AvatarFallback>
            </Avatar>
            <div className="hidden sm:block">
              <p className="text-sm font-medium">{username}</p>
              <p className="text-xs text-muted-foreground">{email}</p>
            </div>
            <Button onClick={LogoutHandle} variant="outline" size="sm">
              Logout
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-zinc-900 mb-2">
            Welcome back, {username}! 👋
          </h2>
          <p className="text-zinc-600">
            Here's your personalized health dashboard
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <Card key={index}>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {stat.title}
                </CardTitle>
                <span className="text-2xl">{stat.icon}</span>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold mb-1">{stat.value}</div>
                <p className="text-xs text-muted-foreground mb-1">
                  {stat.description}
                </p>
                <Badge variant="outline" className="text-xs">
                  {stat.trend}
                </Badge>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="mb-8">
          <h3 className="text-xl font-bold text-zinc-900 mb-4">
            Quick Actions
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {quickActions.map((action, index) => (
              <Card
                key={index}
                className={`cursor-pointer transition-all duration-200 hover:shadow-lg ${action.color}`}
              >
                <CardContent className="p-6 text-center">
                  <div className="text-4xl mb-3">{action.icon}</div>
                  <h4 className="font-semibold mb-1">{action.title}</h4>
                  <p className="text-sm text-muted-foreground">
                    {action.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Two Column Layout */}
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Recent Activity */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
              <CardDescription>
                Your latest interactions and updates
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivity.map((activity, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-4 p-4 rounded-lg bg-zinc-50 hover:bg-zinc-100 transition-colors"
                  >
                    <div className="text-2xl">{activity.icon}</div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-sm">
                        {activity.title}
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        {activity.description}
                      </p>
                    </div>
                    <span className="text-xs text-muted-foreground">
                      {activity.time}
                    </span>
                  </div>
                ))}
                <div className="text-center py-8 text-muted-foreground">
                  <p className="text-sm">
                    Start a consultation to see more activity
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Getting Started */}
          <Card className="lg:col-span-1">
            <CardHeader>
              <CardTitle>Getting Started</CardTitle>
              <CardDescription>Complete your profile setup</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="h-8 w-8 rounded-full bg-green-500 flex items-center justify-center text-white font-bold">
                    ✓
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">Create Account</p>
                    <p className="text-xs text-muted-foreground">Completed</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="h-8 w-8 rounded-full bg-zinc-200 flex items-center justify-center text-zinc-600 font-bold">
                    2
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">Complete Profile</p>
                    <p className="text-xs text-muted-foreground">
                      Add health history
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="h-8 w-8 rounded-full bg-zinc-200 flex items-center justify-center text-zinc-600 font-bold">
                    3
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">First Consultation</p>
                    <p className="text-xs text-muted-foreground">
                      Get AI recommendations
                    </p>
                  </div>
                </div>
                <Button className="w-full mt-4">Continue Setup</Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Health Tips */}
        <Card className="mt-6 border-2 border-zinc-900 bg-zinc-900 text-white">
          <CardHeader>
            <CardTitle className="text-white">💡 Daily Health Tip</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-zinc-100">
              "The art of healing comes from nature, not from the physician.
              Therefore, the physician must start from nature, with an open
              mind." - Paracelsus
            </p>
            <Button variant="secondary" size="sm" className="mt-4">
              Learn More
            </Button>
          </CardContent>
        </Card>
      </main>

      {/* Footer */}
      <footer className="border-t bg-white py-8 mt-12">
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

export default Dashboard;
