"use client";

import { cn } from "@/lib/utils";
import { Separator } from "../ui/separator";
import Link from "next/link";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";
import { buttonVariants } from "../ui/button";
import { usePathname, useRouter } from "next/navigation";
import { VerifiedIcon } from "lucide-react";
import { NAVIGATIONDATA } from "@/constant/navigation";
import { useSidebarStore } from "@/stores/sidebarStore";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { useEffect, useState, useCallback, useMemo } from "react";
import { getUserData } from "@/lib/services";
import { getSectorById } from "@/lib/axios/api/sectors";
import axiosInstance from "@/lib/axios/config";

const SideBar = () => {
  const isOpen = useSidebarStore((state) => state.isOpen);
  const toggleSidebar = useSidebarStore((state) => state.handleShowSidebar);
  const pathname = usePathname();
  const router = useRouter();

  const [userData, setUserData] = useState(null);
  const [userSector, setUserSector] = useState("");

  // Fetch user data and sector information
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const user = await getUserData();
        setUserData(user);

        if (user?.sector_id) {
          const sector = await getSectorById(user.sector_id);
          setUserSector(sector?.name || "");
        }
      } catch (error) {
        console.error("Failed to fetch sector", error);
      }
    };

    fetchUserData();
  }, []);

  // Memoize the logout function to prevent re-creation on each render
  const logout = useCallback(async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("No token found");
        return;
      }
      console.log("token exist: ", token)

      // await axiosInstance.post("/logout", null, {
      //   headers: {
      //     Authorization: `Bearer ${token}`,
      //   },
      // });

      localStorage.removeItem("token");
      console.log("check token exist: ", token)
      router.push("/login");
    } catch (error) {
      console.error("Logout failed", error);
    }
  }, [router]);

  // Avoid rendering Sidebar on login and register pages
  if (pathname === "/login" || pathname === "/register") return null;

  // Memoize navigation data to optimize re-renders
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const navigationLinks = useMemo(() => {
    return NAVIGATIONDATA.map((item, index) => {
      return isOpen ? (
        <Link
          key={index}
          href={item.href}
          className={cn(
            "flex items-center gap-4 h-12 hover:bg-gray-100 rounded w-full px-4 dark:hover:bg-gray-500",
            pathname === item.href &&
              "bg-blue-600 text-white hover:bg-blue-700 md:fill-white dark:bg-blue-400 dark:hover:bg-blue-300"
          )}
        >
          <item.icon className={cn("size-5 flex-shrink-0 dark:fill-white")} />
          <span className="capitalize">{item.label}</span>
        </Link>
      ) : (
        <Tooltip key={index}>
          <TooltipTrigger asChild>
            <Link
              href={item.href}
              className={cn(
                buttonVariants({
                  variant: "ghost",
                  size: "icon",
                }),
                "size-12 dark:hover:bg-gray-600",
                pathname === item.href &&
                  !isOpen &&
                  "fill-white bg-blue-600 transition-colors duration-300 hover:bg-blue-700 dark:bg-blue-400 dark:hover:bg-blue-300"
              )}
            >
              <item.icon className={cn("size-4 dark:fill-white")} />
            </Link>
          </TooltipTrigger>
          <TooltipContent>
            <p>{item.label}</p>
          </TooltipContent>
        </Tooltip>
      );
    });
  }, [isOpen, pathname]);

  return (
    <div className="fixed top-0 left-0 h-screen">
      <div
        className={cn(
          "transition-all duration-300 bg-white dark:bg-[#060606] rounded-lg shadow-[0_3px_10px_rgb(0,0,0,0.05)] h-full",
          isOpen ? "w-64" : "w-16"
        )}
      >
        <div
          className={cn(
            "px-2 relative flex flex-col gap-3",
            isOpen ? "py-2" : "py-6"
          )}
        >
          <button
            className={cn(
              "w-[38px] h-[38px] bg-white border border-gray-200 dark:border-gray-800 absolute -right-[18px] rounded-full flex justify-center items-center dark:bg-[#060606] hover:bg-blue-600 hover:fill-white hover:border-blue-600 duration-150 transition-colors",
              isOpen ? "top-[225px]" : "top-[105px]"
            )}
            onClick={toggleSidebar}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 256 256"
              className={cn(
                "dark:fill-white",
                isOpen &&
                  "rotate-180 duration-75 hover:fill-white transition-all"
              )}
            >
              <path d="M181.66,133.66l-80,80a8,8,0,0,1-11.32-11.32L164.69,128,90.34,53.66a8,8,0,0,1,11.32-11.32l80,80A8,8,0,0,1,181.66,133.66Z"></path>
            </svg>
          </button>

          {isOpen ? (
            <div className="flex flex-col gap-3">
              <div className="h-28 bg-gray-600 rounded-lg relative">
                <Avatar className="aspect-square w-20 h-20 rounded-full border-2 border-white absolute -bottom-9 left-1/2 -translate-x-1/2">
                  <AvatarImage src="/profile.jpg" />
                  <AvatarFallback>E</AvatarFallback>
                </Avatar>
              </div>
              <div className="mt-8 flex flex-col items-center">
                <span className="flex items-center gap-1">
                  <h1 className="font-bold text-lg text-center">
                    {userData?.name}
                  </h1>
                  <VerifiedIcon className="text-white fill-blue-500" />
                </span>
                <p className="text-center font-light capitalize">
                  {userSector} {userData?.role}
                </p>
              </div>
              <Separator className="mt-4" />
            </div>
          ) : (
            <>
              <Avatar className="aspect-square w-12 h-12 rounded-full bg-gray-300">
                <AvatarImage src="/profile.jpg" />
                <AvatarFallback>E</AvatarFallback>
              </Avatar>
              <div className="w-full aspect-video"></div>
              <Separator />
            </>
          )}
        </div>

        <nav
          className={cn(
            "mt-4 flex flex-col gap-3 px-2 pb-6",
            !isOpen ? "items-center" : "items-start"
          )}
        >
          {navigationLinks}
        </nav>

        <button onClick={logout}>Log Out</button>
      </div>
    </div>
  );
};

export default SideBar;
