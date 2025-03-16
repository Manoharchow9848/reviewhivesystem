"use client";
import withOwnerAuth from "../hoc/withOwnerAuth";
import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../components/ui/table";
import { UserDetailContext } from "../../context/userDetailContext";

const Dashboard = () => {
  const [storeData, setStoreData] = useState({ ratings: [], count: 0 });
  const [averageRating, setAverageRating] = useState(0);
  const [stores, setStores] = useState([]);
  const {userDetail,setUserDetail} = React.useContext(UserDetailContext);
  const [email,setEmail] = useState("");

  useEffect(() => {
    
    
    fetchStoreData();
   
  }, []);

  const fetchStoreData = async () => {
    try {
      const response = await fetch("/api/getStoreRatings");
      if (!response.ok) throw new Error("Failed to fetch store data");

      const data = await response.json();

      console.log(data);
     
      const email = JSON.parse(localStorage.getItem("user")).email;
      //console.log(email);
      
      const ownerStores = data.stores.filter(store => store.email === email);
      console.log(ownerStores);
      
      setStores(ownerStores);

      
      
      
      
     

      
    } catch (error) {
      console.error("Error fetching store data:", error);
    }
  };

  return (
    <div className="h-screen w-full mt-4 flex flex-col items-center bg-black text-white p-8">
      <h2 className="text-2xl font-bold mb-4">Store Dashboard</h2>

      {/* Average Rating Display */}
      <div className="mb-6 p-4 bg-gray-800 rounded-lg shadow-md">

        {
          stores.map((store) => (
            <div className="mb-4" key={store.id}>
              <div>
              <h3 className="text-lg font-semibold mb-2">Store Name: {store.name}</h3>
              <p className="text-gray-400">Average Rating: {store.overallRating}</p>
            </div>
            </div>
          ))
        }
        
      </div>

      {/* Ratings Table */}
      <div className="w-full max-w-4xl bg-gray-900 p-6 rounded-lg shadow-lg">
        <h3 className="text-lg font-semibold mb-3">User Ratings</h3>
        <Table className="w-full">
          <TableHeader>
            <TableRow className="bg-gray-700">
              <TableHead className="text-white">Email</TableHead>
              <TableHead className="text-white">Rating</TableHead>
              <TableHead className="text-white">Store Name</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {stores?.length > 0 ? (
              
              stores?.map((item, index) => (
               
                <React.Fragment key={index}>
                {item.rating.map((rating, index) => (
                  <TableRow key={index}>
                    <TableCell className="text-white">{rating.email}</TableCell>
                    <TableCell className="text-white">{rating.rating}</TableCell>
                    <TableCell className="text-white">{item.name}</TableCell>
                  </TableRow>
                ))}
              </React.Fragment>
            ))
            ) : (
              <TableRow>
                <TableCell colSpan={2} className="text-center text-gray-400">
                  No ratings submitted yet.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default withOwnerAuth(Dashboard);
