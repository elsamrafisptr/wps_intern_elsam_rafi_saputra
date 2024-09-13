"use server"

import axiosInstance from "@/lib/axios/config";
import { cookies } from "next/headers";

export const handleLogin = async (data: {
  email: string;
  password: string;
}) => {
  try {
    const response = await axiosInstance.post("/login", data);

    if (response.status !== 200) {
      return false;
    }

    const { success, token } = response.data;
    if (!success) {
      return false;
    }

    cookies().set("token", token, {
      httpOnly: true,
      secure: false,
      path: "/",
      maxAge: 43200,
    });

    return { success: true, message: "Login Success" };
  } catch (err) {
    console.error("Login Failed", err);
    return {
      success: false,
      message: "Login Failed. Please check your credentials.",
    };
  }
};
