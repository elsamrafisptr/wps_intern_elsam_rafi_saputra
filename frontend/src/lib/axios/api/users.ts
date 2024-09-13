import axiosInstance from "../config";

export const getCurrentUserData = async (token: string) => {
  try {
    const response = await axiosInstance.get("/profile", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Failed to fetch user data:", error);
    return null;
  }
};
