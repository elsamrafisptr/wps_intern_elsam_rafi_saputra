"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const Home = () => {
  const router = useRouter();
  const [isCheckingToken, setIsCheckingToken] = useState(true); // Added state

  useEffect(() => {
    const token = window.localStorage.getItem("token");
    if (!token) {
      router.replace("/login");
    } else {
      router.replace("/dashboard");
    }
    setIsCheckingToken(false); 
  }, [router]);

  if (isCheckingToken) {
    return (
      <p className="w-full min-h-screen flex justify-center items-center">
        loading . . .
      </p>
    );
  }

  return null; 
};

export default Home;
