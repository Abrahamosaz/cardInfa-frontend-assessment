"use client";

import useCardRequestStore from "@/store/cardRequest.store";
import { yupResolver } from "@hookform/resolvers/yup";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import CardCustomInput from "../CardCustomInput";
import classNames from "classnames";
import Image from "next/image";
import SuccessModal from "@/components/modals/SuccessModal";
import { RequestCardActions } from "@/contants";

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

// First, let's define the status order
const statusOrder = {
  Pending: 0,
  Acknowledged: 4,
  "In Progress": 1,
  Ready: 2,
  Dispatched: 3,
};

// Map actions to their corresponding status
const actionStatusMap = {
  "Mark as Acknowledged": "Acknowledged",
  "Mark as In Progress": "In Progress",
  "Mark as Ready": "Ready",
  "Send to Dispatch": "Dispatched",
};

const RequestDetails = () => {
  const { currentCardRequest, setCurrentCardRequest, editCardRequestData } =
    useCardRequestStore();
  const currentStatus = currentCardRequest?.status || "Pending";
  const currentStatusIndex =
    statusOrder[currentStatus as keyof typeof statusOrder];

  const [modalMessage, setModalMessage] = useState<string>("");

  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
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

  const { register, handleSubmit, formState } = form;
  const { errors } = formState;

  const onSubmit = (data: RequestDetailsFormData) => {
    console.log("data", data);
  };

  const getCardRequestSuccessModalMessage = (status: string): string => {
    switch (status) {
      case "Ready":
        return "Card batch successfully sent to dispatch";
      case "Download for Production":
        return "Production file has been downloaded";
      default:
        return "";
    }
  };

  const handleRequestAction = (status: string, isDownloadAction: boolean) => {
    if (!currentCardRequest) return;

    if (!isDownloadAction) {
      setCurrentCardRequest({
        ...currentCardRequest,
        status: status,
      });

      editCardRequestData({
        ...currentCardRequest,
        status: status,
      });
    }

    let modalMessage = "";
    if (isDownloadAction) {
      modalMessage = getCardRequestSuccessModalMessage(
        "Download for Production"
      );
    } else {
      modalMessage = getCardRequestSuccessModalMessage(status);
    }

    if (!modalMessage) return;

    setIsSuccessModalOpen(true);
    setModalMessage(modalMessage);
  };

  return (
    <>
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

          <div className="w-full mt-5 flex flex-col gap-4">
            <h2 className="font-semibold text-lg">Actions</h2>

            <div className="w-full flex items-center overflow-x-auto no-scrollbar gap-6 min-w-0">
              {RequestCardActions?.map((action) => {
                // Special case for Download Production - always enabled
                const isDownloadAction =
                  action.label === "Download for Production";

                // Get the status this action corresponds to
                const actionStatus =
                  actionStatusMap[action.label as keyof typeof actionStatusMap];
                const actionStatusIndex = actionStatus
                  ? statusOrder[actionStatus as keyof typeof statusOrder]
                  : -1;

                // Button is disabled if it's not the next action in sequence
                // Download action is always enabled
                const isDisabled =
                  !isDownloadAction &&
                  actionStatusIndex !== currentStatusIndex + 1;

                return (
                  <div
                    key={action.id}
                    className={classNames({
                      "shrink-0 cursor-pointer rounded-[4px] py-2 px-4 text-white flex items-center gap-2 whitespace-nowrap":
                        true,
                      "opacity-40 cursor-not-allowed": isDisabled,
                      "bg-[#344054]":
                        action.label === "Download for Production",
                      "bg-[#B54708]": action.label === "Mark as In Progress",
                      "bg-[#067647]": action.label === "Mark as Ready",
                      "bg-[#8020E7]": action.label === "Send to Dispatch",
                      "bg-[#014DAF]": action.label === "Mark as Acknowledged",
                    })}
                    onClick={
                      isDisabled
                        ? undefined
                        : () =>
                            handleRequestAction(actionStatus, isDownloadAction)
                    }
                  >
                    <Image src={action.icon} alt={action.label} />
                    {action.label}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </form>

      <SuccessModal
        isOpen={isSuccessModalOpen}
        onClose={() => setIsSuccessModalOpen(false)}
        title="Success"
        message={modalMessage}
      />
    </>
  );
};

export default RequestDetails;
