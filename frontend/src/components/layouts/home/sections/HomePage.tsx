"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

const Home = () => {
  const router = useRouter();

  useEffect(() => {
    const token = window.localStorage.getItem("token");

    if (!token) {
      router.replace("/login");
    } else {
      router.replace("/dashboard");
    }
  }, [router]);

  return (
    <p className="w-full min-h-screen flex justify-center items-center">
      loading . . .
    </p>
  );
};

export default Home;
