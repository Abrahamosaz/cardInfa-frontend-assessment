"use client";

import useCardRequestStore from "@/store/cardRequest.store";
import { yupResolver } from "@hookform/resolvers/yup";
import React from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import CardCustomInput from "../CardCustomInput";
import classNames from "classnames";

const schema = yup.object().shape({
  branchName: yup.string().required("Branch Name is required"),
  initiator: yup.string().required("Initiator is required"),
  cardType: yup.string().optional(),
  cardCharges: yup
    .number()
    .typeError("Card charges must be a number")
    .optional(),
  quantity: yup
    .number()
    .typeError("Quantity must be a number")
    .required("Quantity is required")
    .positive("Quantity must be positive")
    .integer("Quantity must be a whole number"),
  batch: yup
    .number()
    .typeError("Batch must be a number")
    .required("Batch is required")
    .positive("Batch must be positive")
    .integer("Batch must be a whole number"),
});

type RequestDetailsFormData = yup.InferType<typeof schema>;

const RequestDetails = () => {
  const { currentCardRequest } = useCardRequestStore();

  console.log("currentCardRequest", currentCardRequest);

  const date = currentCardRequest?.dateRequested
    ? new Date(currentCardRequest?.dateRequested)
    : new Date();
  // Format date as DD/MM/YYYY HH:mm
  const formattedDate = date.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });

  const formattedTime = date.toLocaleTimeString("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
  });

  const form = useForm<RequestDetailsFormData>({
    defaultValues: {
      branchName: currentCardRequest?.branch,
      initiator: currentCardRequest?.initiator,
      quantity: currentCardRequest?.quantity,
      batch: currentCardRequest?.batch,
    },
    resolver: yupResolver(schema),
    mode: "onBlur",
  });

  const { register, handleSubmit, formState, control } = form;
  const { errors, isValid } = formState;

  const onSubmit = (data: RequestDetailsFormData) => {
    console.log("data", data);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      className="w-full flex flex-col gap-4"
    >
      <div className="w-full bg-white rounded-lg border border-[#E2E2E2] p-4 pb-6 flex flex-col gap-4">
        <div className="w-full flex flex-col gap-4">
          <h3 className="text-lg font-semibold text-[#121212]">
            Card Request Details
          </h3>
          <div className="w-full md:w-[80%]">
            <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-x-20 gap-y-4">
              <CardCustomInput
                label="Branch Name"
                placeholder="Enter Branch Name"
                htmlFor="branchName"
                error={errors.branchName?.message ?? ""}
                {...register("branchName")}
              />

              <CardCustomInput
                label="Initiator"
                placeholder="Enter Initiator"
                htmlFor="initiator"
                error={errors.initiator?.message ?? ""}
                type="text"
                {...register("initiator")}
              />

              <CardCustomInput
                label="Card Type"
                placeholder="Classic Debit"
                htmlFor="cardType"
                error={errors.cardType?.message ?? ""}
                type="text"
                {...register("cardType")}
              />

              <CardCustomInput
                label="Card Charges"
                placeholder="₦1,500"
                htmlFor="cardCharges"
                error={errors.cardCharges?.message ?? ""}
                type="number"
                {...register("cardCharges")}
              />

              <CardCustomInput
                label="Quantity"
                placeholder="Enter Quantity"
                htmlFor="quantity"
                error={errors.quantity?.message ?? ""}
                type="number"
                min="0"
                {...register("quantity", {
                  valueAsNumber: true,
                })}
              />

              <CardCustomInput
                label="Batch"
                placeholder="Enter Batch"
                htmlFor="batch"
                error={errors.batch?.message ?? ""}
                type="number"
                min="0"
                {...register("batch", {
                  valueAsNumber: true,
                })}
              />

              <div className="flex flex-col gap-2">
                <label className="text-[#344054]">Date Requested</label>
                <div className="">{`${formattedDate} ${formattedTime}`}</div>
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-[#344054]">Status</label>

                <div
                  className={classNames({
                    "text-center p-2 px-4 rounded-3xl border w-fit": true,
                    "border-[#ABEFC6] bg-[#ECFDF3]":
                      currentCardRequest?.status === "Ready",
                    "border-[#FEDF89] bg-[#FFFAEB]":
                      currentCardRequest?.status === "In Progress",
                    "border-[#EAECF0] bg-[#F9FAFB]":
                      currentCardRequest?.status === "Pending",
                    "border-[#B2DDFF] bg-[#EFF8FF]":
                      currentCardRequest?.status === "Acknowledged",
                  })}
                >
                  {currentCardRequest?.status}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="w-full mt-5">
          <h2>Actions</h2>
        </div>
      </div>
    </form>
  );
};

export default RequestDetails;
