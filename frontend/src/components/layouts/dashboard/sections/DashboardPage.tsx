"use client";

import Container from "@/components/elements/Container";
import { getUserData } from "@/lib/services";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const Dashboard = () => {
  const router = useRouter();

  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const user = getUserData();
    if (user) {
      setUserData(user); 
    }
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/login");
    }
  }, []);

  return (
    <Container className="min-h-screen">
      <div className="flex flex-col gap-6">
        <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
          Welcome to Daylog App!
        </h1>
        <h2 className="scroll-m-20 border-b pb-2 text-3xl font-bold tracking-tight first:mt-0">
          Hello, {userData?.name}
        </h2>
        <p className="leading-7 text-justify">
          In this application you can create your absences or daily logs.
          Don&apos;t forget to check in, check out, and explain your activites
          today. After that wait your absences verificated by your supervisor.
          <br />
          Good luck for your day!
        </p>
      </div>
      <div className="mt-12">
        <h1>This is your statistic</h1>
      </div>
    </Container>
  );
};

export default Dashboard;
