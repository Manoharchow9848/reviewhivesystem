"use client";

import React, { useEffect, useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../components/ui/table";

const Dashboard = () => {
  const [storeData, setStoreData] = useState({ ratings: [], count: 0 });
  const [averageRating, setAverageRating] = useState(0);

  useEffect(() => {
    fetchStoreData();
  }, []);

  const fetchStoreData = async () => {
    try {
      const response = await fetch("/api/getStoreRatings");
      if (!response.ok) throw new Error("Failed to fetch store data");

      const data = await response.json();
      console.log(data);
      
      setStoreData(data.stores);

      // Calculate average rating
      if (data.stores.rating?.length > 0) {
        const totalRating = data.ratings.reduce((sum, item) => sum + item.rating, 0);
        setAverageRating((totalRating / data.ratings.length).toFixed(1));
      }
    } catch (error) {
      console.error("Error fetching store data:", error);
    }
  };

  return (
    <div className="h-screen w-full mt-4 flex flex-col items-center bg-black text-white p-8">
      <h2 className="text-2xl font-bold mb-4">Store Dashboard</h2>

      {/* Average Rating Display */}
      <div className="mb-6 p-4 bg-gray-800 rounded-lg shadow-md">
        <h3 className="text-lg">Average Rating:</h3>
        <p className="text-3xl font-bold">{averageRating} ⭐</p>
      </div>

      {/* Ratings Table */}
      <div className="w-full max-w-4xl bg-gray-900 p-6 rounded-lg shadow-lg">
        <h3 className="text-lg font-semibold mb-3">User Ratings</h3>
        <Table className="w-full">
          <TableHeader>
            <TableRow className="bg-gray-700">
              <TableHead className="text-white">Email</TableHead>
              <TableHead className="text-white">Rating</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {storeData.ratings?.length > 0 ? (
              storeData.ratings.map((item, index) => (
                <TableRow key={index} className="border-b border-gray-600 hover:bg-gray-800">
                  <TableCell className="text-white">{item.email}</TableCell>
                  <TableCell className="text-white">{item.rating} ⭐</TableCell>
                </TableRow>
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

export default Dashboard;
