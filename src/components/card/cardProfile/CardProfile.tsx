"use client";

import { SearchIcon } from "@/public/icons";
import React, { useEffect, useMemo, useState } from "react";
import { IoIosAdd } from "react-icons/io";
import Image from "next/image";
import CustomTable from "@/components/CustomTable";
import { CardProfileColumns } from "../data";
import { usePathname, useRouter } from "next/navigation";
import useCardProfileStore from "@/store/cardProfile.store";
import { CardProfiledataProps } from "@/type";

const CardProfile = () => {
  const router = useRouter();
  const pathname = usePathname();

  const { cardProfiles } = useCardProfileStore();
  const [searchString, setSearchString] = useState("");

  const [currentItems, setCurrentItems] = useState<CardProfiledataProps[]>([]);
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 5;

  const columns = useMemo(() => CardProfileColumns, []);

  const onPageChange = (page: number) => {
    setCurrentPage(page);
  };

  useEffect(() => {
    // First filter the data based on search string

    let filteredProfiles = cardProfiles;
    if (searchString) {
      filteredProfiles = cardProfiles.filter((profile) =>
        profile.name.toLowerCase().includes(searchString.toLowerCase())
      );
    }

    // Then calculate the start and end index for the current page
    const startIndex = currentPage * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;

    // Update the current items with filtered and paginated data
    setCurrentItems(filteredProfiles.slice(startIndex, endIndex));
  }, [currentPage, cardProfiles, searchString]);

  return (
    <div className="w-full flex flex-col gap-4">
      {/* search  */}
      <div className="flex items-center gap-4 justify-between border-y py-3.5 border-[#98A2B3]">
        <div className="max-w-[180px] md:min-w-[300px] lg:min-w-[400px] flex items-center gap-2 md:gap-4 py-3 px-4 rounded-lg bg-[#FFFFFF] border border-[#D0D5DD]">
          <Image
            className="w-4 h-4 md:w-5 md:h-5"
            src={SearchIcon}
            alt="search"
          />
          <input
            value={searchString}
            onChange={(e) => setSearchString(e.target.value)}
            className="w-full outline-none border-none bg-transparent placeholder:text-xs md:placeholder:text-base"
            type="text"
            placeholder="Search by card name"
          />
        </div>
        <div
          onClick={() => router.push(`${pathname}/create-profile`)}
          className="cursor-pointer py-3 px-4 flex items-center text-white bg-[#014DAF] rounded-[4px]"
        >
          <IoIosAdd className="text-white w-6 h-6" />
          <p className="text-xs sm:text-sm md:text-base">Add Profile</p>
        </div>
      </div>

      <CustomTable
        columns={columns}
        data={currentItems}
        pageCount={Math.ceil(cardProfiles.length / itemsPerPage)}
        currentPage={currentPage}
        onPageChange={onPageChange}
        headerStyle="bg-[#F9FAFB] border border-[#EAECF0] text-[#475467]"
        cellStyle="border border-[#EAECF0] text-[#475467]"
      />
    </div>
  );
};

export default CardProfile;
