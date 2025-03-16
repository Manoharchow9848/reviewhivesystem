"use client";
import Link from "next/link";
import { Input } from "../../components/ui/input";
import { Button } from "../../components/ui/button";
import React, { useEffect } from "react";
import { LoaderCircle, Store } from "lucide-react";
import { toast } from "sonner";
import { UserDetailContext } from "../../context/userDetailContext";
import { useRouter } from "next/navigation";

const LoginPage = () => {
  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      toast.success("You are already logged in!");
      router.push("/"); // Change to your desired route
    }
  }, []);
  const router = useRouter();
  const [loading, setLoading] = React.useState(false);
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const { userDetail, setUserDetail } = React.useContext(UserDetailContext);
  const handleLogin = async () => {
    if (!email || !password) {
      toast.error("Please enter both email and password.");

      return;
    }
    const toastId = toast.loading("Logging in...");
    try {
      setLoading(true);

      const response = await fetch("/api/login", {
        method: "POST", // Use POST for sending login credentials
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      });

      if (!response.ok) {
        toast.error("Login failed. Please check your credentials.");
        toast.dismiss(toastId);
        setLoading(false);
        return;
      }

      const result = await response.json();
      localStorage.setItem("user", JSON.stringify(result.user));
      setUserDetail(result.user);
      console.log("Login successful:", result);
      toast.success("Login successful! Welcome back!");
      router.push("/");
      toast.dismiss(toastId);
      setLoading(false);
    } catch (error) {
      console.error("Login failed:", error);
      setLoading(false);
      toast.error("Login failed. Please check your credentials.");
      toast.dismiss(toastId);
    }
  };

  return (
    <div className="h-screen flex items-center justify-center bg-black text-white ">
      <div className="bg-gray-900 p-8 rounded-lg shadow-lg w-96">
        <Store color="green" className="mx-auto mb-4" />
        <h1 className="text-4xl font-bold text-center mb-6 text-gray-500">
          Review Hive
        </h1>
        <h2 className="text-2xl font-extrabold text-center mb-6 text-gray-700">
          Login
        </h2>

        {/* Email Input */}
        <div>
          <label className="block text-gray-400 mb-1">Email</label>
          <Input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full bg-gray-800 text-white border-gray-700"
          />
        </div>

        {/* Password Input */}
        <div className="mt-4">
          <label className="block text-gray-400 mb-1">Password</label>
          <Input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full bg-gray-800 text-white border-gray-700"
          />
        </div>

        {/* Login Button */}
        <Button
          onClick={handleLogin}
          className="w-full bg-blue-500 hover:bg-blue-600 mt-6 cursor-pointer"
        >
          {loading ? (
            <LoaderCircle className="animate-spin mr-2" size={16} />
          ) : (
            "Login"
          )}
        </Button>

        {/* Signup Link */}
        <p className="text-gray-400 text-center mt-4 font-bold">
          Don't have an account?{" "}
          <Link href="/signup" className="text-blue-400 hover:underline">
            Click here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
