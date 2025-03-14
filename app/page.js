import React from "react";
import { Button } from "../components/ui/button";
import Link from "next/link";
import { Store } from "lucide-react";
export default function Home() {
  return (
    <div className="h-screen flex flex-col items-center justify-center bg-black text-white text-center px-6">
      <Store color="green" className="mx-auto mb-4" />
      <h1 className="text-4xl font-bold">Welcome to Review Hive</h1>
      <p className="text-lg mt-2 text-gray-400">
        Find and rate the best stores in your area with ease.
      </p>
      
      <Link href="/stores">
        <Button className="mt-6 bg-white text-black px-6 py-3 text-lg cursor-pointer hover:bg-gray-200">
          Get Started
        </Button>
      </Link>
    </div>
  );
}
