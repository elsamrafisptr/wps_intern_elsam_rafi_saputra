import { NextRequest } from "next/server";

export const getAuthToken = async (request: NextRequest) => {
  const token = request.cookies.get("token")?.value;
  return token;
};
