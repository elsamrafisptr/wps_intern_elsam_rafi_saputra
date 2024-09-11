import axiosInstance from "../config";

export const getSectorById = async (id: number) => {
  try {
    const response = await axiosInstance.get(`/sectors/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`, // Pass the token
      },
    });
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Failed to fetch sector data:", error);
    return null;
  }
};
