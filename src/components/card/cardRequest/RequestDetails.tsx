"use client";

import useCardRequestStore from "@/store/cardRequest.store";
import React from "react";

const RequestDetails = () => {
  const { currentCardRequest } = useCardRequestStore();

  console.log("currentCardRequest", currentCardRequest);

  return <div>RequestDetails</div>;
};

export default RequestDetails;
