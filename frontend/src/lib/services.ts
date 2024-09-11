export const getUserData = () => {
  const userData = localStorage.getItem("user");
  return userData && JSON.parse(userData);
};

export const getAuthToken = () => {
  const userData = getUserData();
  return userData && userData.token;
};
