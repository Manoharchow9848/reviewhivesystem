import Link from "next/link";
import React from "react";
import { FaUser, FaStore, FaUsers, FaTachometerAlt, FaPlus } from "react-icons/fa";

const DashSidebar = () => {
  return (
    <div className="bg-gray-900 text-white h-screen w-64 p-5">
      <h2 className="text-2xl font-bold mb-6">Admin Panel</h2>
      <ul className="space-y-4">
        <Link href="/dashboard">
        <li className="flex items-center gap-2 hover:bg-blue-800 p-2 rounded">
          <FaTachometerAlt /> <span>Dashboard</span>
        </li>
        </Link>
        <Link href="/profile">
        <li className="flex items-center gap-2 hover:bg-blue-800 p-2 rounded">
          <FaUser /> <span>Profile</span>
        </li>
        
        </Link>
        <Link href="/add-store-owner">
        <li className="flex items-center gap-2 hover:bg-blue-800 p-2 rounded">
          <FaUser /> <span>Add Store Owner</span>
        </li>
        
        </Link>
        <Link href="/add-store">
        <li className="flex items-center gap-2 hover:bg-blue-800 p-2 rounded">
          <FaPlus /> <span>Add Store</span>
        </li>
        </Link>
        <Link href="/users">
        <li className="flex items-center gap-2 hover:bg-blue-800 p-2 rounded">
          <FaUsers /> <span>List of Users</span>
        </li>
        </Link>
        <Link href="get-stores">
        <li className="flex items-center gap-2 hover:bg-blue-800 p-2 rounded">
          <FaStore /> <span>List of Stores</span>
        </li>
        </Link>
        <Link href="/add-admin">
        <li className="flex items-center gap-2 hover:bg-blue-800 p-2 rounded">
          <FaUser /> <span>Add Admin</span>
        </li>
        </Link>
        
      </ul>
    </div>
  );
};

export default DashSidebar;
