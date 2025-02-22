import React from "react";
import { FiCalendar } from "react-icons/fi";
import QuickAccess from "./QuickAccess";

const Header = () => {
  return (
    <div className="w-full h-full flex flex-col gap-4">
      <div className="w-full flex flex-col max-sm:gap-1">
        <div className="w-full flex max-sm:flex-col-reverse sm:items-center sm:justify-between gap-2">
          <h2 className="text-base 2xs:text-lg font-bold text-[#121212]">
            Hi Nazeer, what would you like to do today?
          </h2>

          <div className="w-fit flex items-center text-[#121212] text-xs border border-[#D0D5DD] rounded-md px-3 py-2 divide-x divide-[#D0D5DD]">
            <div className="flex items-end gap-1 pr-2">
              <FiCalendar className="text-base" />
              <p className="font-medium">Today</p>
            </div>
            <p className="pl-2">11 Nov 2024</p>
          </div>
        </div>

        <p className="text-xs text-[#121212] font-medium">
          Last login: 26/11/2024 <span className="font-regular">14:39:58</span>
        </p>
      </div>
      <QuickAccess />
    </div>
  );
};

export default Header;
