"use client";

import React, { useEffect, useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../components/ui/table";

const ListOfUsersPage = () => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [filters, setFilters] = useState({
    name: "",
    email: "",
    address: "",
    role: "",
  });

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await fetch("/api/getUsers");
      if (!response.ok) throw new Error("Failed to fetch users");

      const data = await response.json();
      setUsers(data.users);
      setFilteredUsers(data.users);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  // Handle filter changes
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));

    const newFilteredUsers = users.filter((user) =>
      Object.keys(filters).every((key) =>
        user[key]?.toLowerCase().includes(
          key === name ? value.toLowerCase() : filters[key].toLowerCase()
        )
      )
    );

    setFilteredUsers(newFilteredUsers);
  };

  return (
    <div className="h-screen w-full mt-8 bg-black text-white p-8">
      <h2 className="text-2xl font-bold mb-6">Users List</h2>
      <div className="bg-gray-900 p-4 rounded-lg shadow-md">
        <Table className="w-full">
          <TableHeader>
            <TableRow className="bg-gray-800">
              <TableHead className="text-white">Name</TableHead>
              <TableHead className="text-white">Email</TableHead>
              <TableHead className="text-white">Address</TableHead>
              <TableHead className="text-white">Role</TableHead>
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
              <TableCell>
                <input
                  type="text"
                  name="role"
                  value={filters.role}
                  onChange={handleFilterChange}
                  placeholder="Filter by Role"
                  className="w-full p-1 text-black rounded"
                />
              </TableCell>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredUsers.length > 0 ? (
              filteredUsers.map((user) => (
                <TableRow key={user.id} className="border-b border-gray-700 hover:bg-gray-800">
                  <TableCell className="text-white">{user.name}</TableCell>
                  <TableCell className="text-white">{user.email}</TableCell>
                  <TableCell className="text-white">{user.address}</TableCell>
                  <TableCell className="text-white">{user.role}</TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={4} className="text-center text-gray-400">
                  No users found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default ListOfUsersPage;
