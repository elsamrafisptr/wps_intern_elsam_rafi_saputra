import { redirect } from "next/navigation";

const Home = () => {
  const token = localStorage.getItem("token");
  if (!token) {
    redirect("/login");
  } else {
    redirect("/dashboard")
  }
};

export default Home;
