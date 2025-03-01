"use client";

import useCardRequestStore from "@/store/cardRequest.store";
import { CardRequestdataProps } from "@/type";
import { useRouter } from "next/navigation";
import React from "react";

const CardRequestActionCell = ({ data }: { data: CardRequestdataProps }) => {
  const router = useRouter();

  const { setCurrentCardRequest } = useCardRequestStore();

  const handleView = () => {
    console.log("data", data);
    setCurrentCardRequest(data);
    router.push(`/card-request/request-details`);
  };

  return (
    <div
      onClick={handleView}
      className="w-full cursor-pointer text-center text-[#014DAF] font-bold text-sm"
    >
      View
    </div>
  );
};

export default CardRequestActionCell;
