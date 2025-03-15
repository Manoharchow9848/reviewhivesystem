"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const withAuth = (WrappedComponent) => {
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
    }, [router]);

    if (isLoading) return null; // Prevent flickering while redirecting

    return <WrappedComponent  {...props} />;
  };
};

export default withAuth;
