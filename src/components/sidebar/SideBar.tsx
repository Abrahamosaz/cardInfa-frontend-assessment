"use client";
import useLayoutStore from "@/store/layout.store";
import MainSidebar from "./MainSideBar";
import classNames from "classnames";

const Sidebar = () => {
  const { isMenuOpen, toggleMenu } = useLayoutStore();

  return (
    <>
      <div
        className={classNames(
          "hidden lg:flex flex-col lg:w-[28%] xl:w-[20%] bg-white h-screen sticky z-50 transform transition-all duration-300 ease-in-out"
        )}
      >
        <MainSidebar />
      </div>

      {isMenuOpen && (
        <div
          className="lg:hidden fixed inset-0 z-[98]"
          onClick={toggleMenu} // Close the menu when clicking the overlay
        />
      )}

      {/* Mobile Sidebar */}
      <div
        className={classNames(
          "lg:hidden fixed z-[99] flex flex-col bg-white h-screen transition-transform duration-300 ease-in-out",
          {
            "translate-x-0 w-[80%] 2xs:w-[70%] xs:w-[60%] md:w-[50%]":
              isMenuOpen,
            "-translate-x-full": !isMenuOpen,
          }
        )}
      >
        <MainSidebar />
      </div>
    </>
  );
};

export default Sidebar;
