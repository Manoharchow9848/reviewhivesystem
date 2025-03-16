"use client";
import React, { use, useEffect, useState } from "react";
import withDashAuth from "../hoc/withDashAuth";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import { UserDetailContext } from "../../context/userDetailContext";
import { FaUsers } from "react-icons/fa";
import { Star, Store,User } from "lucide-react";

const DashboardPage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const {userDetail,setUserDetail } = React.useContext(UserDetailContext);
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalStoreOwners, setTotalStoreOwners] = useState(0);
  const [totalStores, setTotalStores] = useState(0);
  const [rating,setRatings] = useState(0);
  useEffect(() => {
    countUsers(); 
    countStoreOwners();
    countStores();
    fetchUsers();
  },[])
  const countUsers = async () => {
    try {
        const response = await fetch("/api/countUsers", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
            cache: "no-store", // Ensures fresh data in Next.js
        });

        if (!response.ok) {
            throw new Error(`Error: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();
        console.log("Total Users:", data.count);
        setTotalUsers(data.count);
        return data.count;
    } catch (error) {
        console.error("Failed to fetch user count:", error);
        return null; // Handle errors gracefully
    }
};
const countStoreOwners = async () => {
  try {
     const response = await fetch("/api/countOwners");
     if (!response.ok) {
        throw new Error("Failed to fetch store owners count");
     }
     const data = await response.json();
     console.log("Total Store Owners:", data.count);
     setTotalStoreOwners(data.count);
  } catch (error) {
     console.error("Error fetching store owners count:", error);
  }
};

const countStores = async () => {
  try {
     const response = await fetch("/api/countStores");
     if (!response.ok) {
        throw new Error("Failed to fetch stores count");
     }
     const data = await response.json();
     console.log("Total Stores:", data.count);
     setTotalStores(data.count);
  } catch (error) {
     console.error("Error fetching stores count:", error);
  }
};

const fetchUsers = async()=>{
  try {
    const response = await fetch("/api/getStores");
      if (!response.ok) throw new Error("Failed to fetch stores");

      const data = await response.json();
      console.log(data.stores)

      let totalCount = 0;
      
      data.stores.forEach((store) => {
        totalCount += store?.count
        
        
      });
      console.log(totalCount);
      setRatings(totalCount)
      
      
      
      
      
  } catch (error) {
     console.log(error);
     
  }
}

  return (

    <div className="bg-black min-h-screen w-screen p-6 text-white ">
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>

      {/* User Card */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="bg-gray-900 text-white p-5">
          <CardHeader>

            <CardTitle className="text-xl flex items-center gap-2">
            <FaUsers className="text-blue-500 text-2xl" />
            <span>Total Users</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <h2 className="text-4xl font-bold"> {totalUsers}</h2>
          </CardContent>
          
        </Card>
        <Card className="bg-gray-900 text-white p-5">
          <CardHeader>

            <CardTitle className="text-xl flex items-center gap-2">
            <Store className="text-blue-500 text-2xl" />
            <span>Total Stores Owners</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <h2 className="text-4xl font-bold">{totalStoreOwners}</h2>
          </CardContent>
          
        </Card>

        <Card className="bg-gray-900 text-white p-5">
          <CardHeader>

            <CardTitle className="text-xl flex items-center gap-2">
            <User className="text-blue-500 text-2xl" />
            <span>Total Stores</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <h2 className="text-4xl font-bold">{totalStores}</h2>
          </CardContent>
          
        </Card>
        <Card className="bg-gray-900 text-white p-5">
          <CardHeader>

            <CardTitle className="text-xl flex items-center gap-2">
            <Star className="text-blue-500 text-2xl" />
            <span>Total Ratings</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <h2 className="text-4xl font-bold">{rating}</h2>
          </CardContent>
          
        </Card>
        

       
      </div>
    </div>
  );
};

export default withDashAuth(DashboardPage);
