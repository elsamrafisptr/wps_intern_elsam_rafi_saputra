import axiosInstance from "../config";
import dayjs from "dayjs";

export const getAllAbsences = async () => {
  try {
    const response = await axiosInstance.get("/absences");
    return response.data;
  } catch (error) {
    console.error("Failed to fetch absence data:", error);
    return null;
  }
};

export const checkAbsenceToday = async () => {
  try {
    const absences = await getAllAbsences();
    if (!absences) return false;

    const today = dayjs().format("YYYY-MM-DD");
    const hasAbsenceToday = absences.some(
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (absence: any) => dayjs(absence.date).format("YYYY-MM-DD") === today
    );

    return hasAbsenceToday;
  } catch (error) {
    console.error("Failed to check absence for today:", error);
    return false;
  }
};
