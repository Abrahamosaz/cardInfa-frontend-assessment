"use client";

import { SearchIcon } from "@/public/icons";
import React, { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import CustomTable from "@/components/CustomTable";
import { CardRequestdataProps } from "@/type";
import { CardRequestColumns } from "../data";
import { cardRequestData } from "@/contants";

const CardRequest = () => {
  const [currentItems, setCurrentItems] = useState<CardRequestdataProps[]>([]);
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 5;

  const columns = useMemo(() => CardRequestColumns, []);

  const onPageChange = (page: number) => {
    setCurrentPage(page);
  };

  useEffect(() => {
    // Calculate the start and end index for the current page
    const startIndex = currentPage * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    // Update the current items
    setCurrentItems(cardRequestData.slice(startIndex, endIndex));
  }, [currentPage, itemsPerPage]);

  return (
    <div className="w-full flex flex-col gap-4">
      {/* search  */}
      <div className="border-y py-3.5 border-[#98A2B3]">
        <div className="max-w-[180px] md:min-w-[300px] lg:min-w-[400px] flex items-center gap-2 md:gap-4 py-3 px-4 rounded-lg bg-[#FFFFFF] border border-[#D0D5DD]">
          <Image
            className="w-4 h-4 md:w-5 md:h-5"
            src={SearchIcon}
            alt="search"
          />
          <input
            className="w-full outline-none border-none bg-transparent placeholder:text-xs md:placeholder:text-base"
            type="text"
            placeholder="Search by branch"
          />
        </div>
      </div>

      <CustomTable
        columns={columns}
        data={currentItems}
        pageCount={Math.ceil(cardRequestData.length / itemsPerPage)}
        currentPage={currentPage}
        onPageChange={onPageChange}
        headerStyle="bg-[#F9FAFB] border border-[#EAECF0] text-[#475467]"
        cellStyle="border border-[#EAECF0] text-[#475467]"
      />
    </div>
  );
};

export default CardRequest;
