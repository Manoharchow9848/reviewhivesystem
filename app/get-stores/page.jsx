"use client";

import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../components/ui/table";

const GetStoresPage = () => {
  const [stores, setStores] = useState([]);
  const [filteredStores, setFilteredStores] = useState([]);
  const [filters, setFilters] = useState({
    name: "",
    email: "",
    address: "",
  });

  useEffect(() => {
    fetchStores();
  }, []);

  const fetchStores = async () => {
    try {
      const response = await fetch("/api/getStores");
      if (!response.ok) throw new Error("Failed to fetch stores");

      const data = await response.json();
      setStores(data.stores);
      setFilteredStores(data.stores);
    } catch (error) {
      console.error("Error fetching stores:", error);
    }
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));

    const newFilteredStores = stores.filter((store) =>
      Object.keys(filters).every((key) =>
        store[key]?.toLowerCase().includes(
          key === name ? value.toLowerCase() : filters[key].toLowerCase()
        )
      )
    );

    setFilteredStores(newFilteredStores);
  };

  return (
    <div className="h-screen w-full mt-8 bg-black text-white p-8">
      <h2 className="text-2xl font-bold mb-6">Stores List</h2>
      <div className="bg-gray-900 p-4 rounded-lg shadow-md">
        <Table className="w-full">
          <TableHeader>
            <TableRow className="bg-gray-800">
              <TableHead className="text-white">Name</TableHead>
              <TableHead className="text-white">Email</TableHead>
              <TableHead className="text-white">Address</TableHead>
              <TableHead className="text-white">OverAllRating</TableHead>
            </TableRow>
            <TableRow className="bg-gray-700">
              <TableCell>
                <input
                  type="text"
                  name="name"
                  value={filters.name}
                  onChange={handleFilterChange}
                  placeholder="Filter by Name"
                  className="w-full p-1 text-black rounded"
                />
              </TableCell>
              <TableCell>
                <input
                  type="text"
                  name="email"
                  value={filters.email}
                  onChange={handleFilterChange}
                  placeholder="Filter by Email"
                  className="w-full p-1 text-black rounded"
                />
              </TableCell>
              <TableCell>
                <input
                  type="text"
                  name="address"
                  value={filters.address}
                  onChange={handleFilterChange}
                  placeholder="Filter by Address"
                  className="w-full p-1 text-black rounded"
                />
              </TableCell>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredStores.length > 0 ? (
              filteredStores.map((store) => (
                <TableRow key={store.id} className="border-b border-gray-700 hover:bg-gray-800">
                  <TableCell className="text-white">{store.name}</TableCell>
                  <TableCell className="text-white">{store.email}</TableCell>
                  <TableCell className="text-white">{store.address}</TableCell>
                  <TableCell className="text-white">{store.overallRating}</TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={3} className="text-center text-gray-400">
                  No stores found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default GetStoresPage;
