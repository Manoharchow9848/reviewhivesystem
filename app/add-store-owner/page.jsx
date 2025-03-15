"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Input } from "../../components/ui/input";
import { Button } from "../../components/ui/button";
import { Textarea } from "../../components/ui/textarea";
import { LoaderCircle, Store } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const AddStoreOwnerPage = () => {
    const validatePassword = (password) => {
        const passwordRegex = /^(?=.*[A-Z])(?=.*[\W_]).{8,16}$/;
        return passwordRegex.test(password);
      };
       const [loading, setLoading] = useState(false);
        const router = useRouter();
        const [userData, setUserData] = useState({
          name: "",
          email: "",
          password: "",
          address: "",
          role: "store-owner",
        });
        const handleChange = (e) => {
            setUserData({ ...userData, [e.target.name]: e.target.value });
          };
          const handleSubmit = async () => {
              if (!userData.name || !userData.email || !userData.password || !userData.address) {
                toast.error("All fields are required! ❌");
                setLoading(false);
                return;
              }
          
              // Check if password is valid
              if (!validatePassword(userData.password)) {
                toast.error("Password must be 8-16 characters long and contain at least one uppercase letter and one special character! ❌");
                setLoading(false);
               
                return;
              }
              const toastId = toast.loading("Adding store owner... Please wait ");
              try {
                setLoading(true);
          
                // Check if fields are empty
               
          
                // Show loading toast
                
          
                const response = await fetch("/api/create-user", {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify(userData),
                });
          
                if (!response.ok) {
                  throw new Error(`Error: ${response.status} - ${response.statusText}`);
                }
          
                const result = await response.json();
                toast.success("Strore owner created successfully! 🎉");
                
          
                // Close loading toast and redirect
                toast.dismiss(toastId);
                router.push("/dashboard");
          
              } catch (error) {
                toast.error(`Failed to create Store owner: ${error.message} ❌`);
                
                toast.dismiss(toastId);
              } finally {
                setLoading(false);
                
              }
            };
  return (
    <div className="h-screen w-screen flex items-center justify-center bg-black text-white">
      <div className="bg-gray-900 p-8 rounded-lg shadow-lg w-96">
        <Store color="green" className="mx-auto mb-4" />
        <h1 className="text-4xl font-bold text-center mb-4 text-gray-500">Review Hive</h1>
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-600">Add Store Owner</h2>

        <div className="space-y-4">
          {/* Name Field */}
          <div>
            <label className="block text-gray-400 mb-1">Enter store owner name</label>
            <Input
              type="text"
              name="name"
              placeholder="Enter your name"
              value={userData.name}
              onChange={handleChange}
              className="w-full bg-gray-800 text-white border-gray-700"
            />
          </div>

          {/* Email Field */}
          <div>
            <label className="block text-gray-400 mb-1">Enter store owner email</label>
            <Input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={userData.email}
              onChange={handleChange}
              className="w-full bg-gray-800 text-white border-gray-700"
            />
          </div>

          {/* Password Field */}
          <div>
            <label className="block text-gray-400 mb-1">Enter Password</label>
            <Input
              type="password"
              name="password"
              placeholder="Enter your password"
              value={userData.password}
              onChange={handleChange}
              className="w-full bg-gray-800 text-white border-gray-700"
            />
          </div>

          {/* Address Field */}
          <div>
            <label className="block text-gray-400 mb-1">Enter store owner address</label>
            <Textarea
              name="address"
              placeholder="Enter your address"
              value={userData.address}
              onChange={handleChange}
              className="w-full bg-gray-800 text-white border-gray-700"
            />
          </div>

          {/* Sign Up Button */}
          <Button onClick={handleSubmit} className="cursor-pointer w-full bg-blue-500 hover:bg-blue-600">
            {loading ? <LoaderCircle className="animate-spin mr-2" size={16} /> : "Add Store Owner"}
          </Button>
        </div>

        
      </div>
    </div>
  )
}

export default AddStoreOwnerPage