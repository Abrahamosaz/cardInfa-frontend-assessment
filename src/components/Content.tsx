"use client";

import React from "react";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";
import { Avatar, BellIcon, inactive, SearchIcon } from "@/public/icons";
import { FiMenu } from "react-icons/fi";
import useLayoutStore from "@/store/layout.store";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import classNames from "classnames";

const Content = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();
  const router = useRouter();

  const { toggleMenu } = useLayoutStore();

  const getIconAndLabel = (path?: string) => {
    switch (path || pathname) {
      case "/dashboard":
        return {
          icon: inactive.InActiveDashboard,
          label: "Dashboard",
        };
      case "/card-profile":
        return {
          icon: inactive.CardProfile,
          label: "Card Profile",
        };
      case "/card-request":
        return {
          icon: inactive.CardRequest,
          label: "Card Request",
        };

      case "/create-profile":
      case "/card-profile/create-profile":
        return {
          icon: inactive.CardProfile,
          label: "Create Profile",
        };
      default:
        return {};
    }
  };

  const getPathSegments = () => {
    return pathname.split("/").filter(Boolean);
  };

  const canGoBack = (): boolean => {
    const segments = getPathSegments();

    return (
      segments.length > 1 &&
      !["dashboard", "card-profile", "card-request"].includes(
        segments[segments.length - 1]
      )
    );
  };

  const paths = getPathSegments();

  return (
    <div className="w-full flex flex-col">
      <div className="w-full border-b-[1px] border-[#DEDEDF] px-6 py-4">
        <div className="w-full flex items-center justify-between">
          {/* left section */}
          <section className="hidden md:flex items-center gap-4">
            {canGoBack() && (
              <div
                className="flex items-center gap-4"
                onClick={() => router.back()}
              >
                <IoIosArrowBack className="w-6 h-6 cursor-pointer" />
                <p className="text-lg">Back</p>
              </div>
            )}
            <div className="flex items-center gap-4">
              <Image
                className="w-6 h-6"
                src={getIconAndLabel().icon}
                alt="icon"
              />
              {paths?.length > 1 && (
                <IoIosArrowForward className="w-6 h-6 text-[#D0D5DD]" />
              )}
              <p
                className={classNames({
                  "text-lg": true,
                  "font-semibold": paths.length === 1,
                })}
              >
                {getIconAndLabel().label}
              </p>
            </div>

            {paths?.length > 1 && (
              <div className="flex items-center gap-4">
                <IoIosArrowForward className="w-6 h-6 text-[#D0D5DD]" />
                <p className="text-lg font-semibold">
                  {getIconAndLabel(`/${paths[paths.length - 1]}`).label}
                </p>
              </div>
            )}
          </section>

          <div
            onClick={toggleMenu}
            className="md:hidden flex justify-center items-center text-[#1C1B1F] text-center text-3xl"
          >
            <FiMenu />
          </div>

          {/* right section */}
          <section className="flex items-center gap-6">
            {pathname === "/dashboard" && (
              <div className="hidden md:flex items-center gap-4 py-2 px-4 rounded-3xl border border-[#D0D5DD]">
                <Image className="w-5 h-5" src={SearchIcon} alt="search" />
                <input
                  className="min-w-[200px] outline-none border-none bg-transparent"
                  type="text"
                  placeholder="Search"
                />
              </div>
            )}

            <Image src={BellIcon} alt="bell" />
            <Image src={Avatar} alt="avatar" />
          </section>
        </div>
      </div>

      <div className="w-full h-full overflow-y-auto no-scrollbar p-6 bg-[#F8FBFF]">
        {children}
      </div>
    </div>
  );
};

export default Content;
