"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const withOwnerAuth = (WrappedComponent) => {
  return function ProtectedComponent(props) {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
      const storedUser = JSON.parse(localStorage.getItem("user") || "null");

      if (!storedUser) {
        router.push("/login");
      } else {
        setIsLoading(false);
      }

      if (storedUser && storedUser.role !== "store-owner") {
        router.push("/");
      }
    }, [router]);

    if (isLoading) return null; // Prevent flickering while redirecting

    return <WrappedComponent  {...props} />;
  };
};

export default withOwnerAuth;
