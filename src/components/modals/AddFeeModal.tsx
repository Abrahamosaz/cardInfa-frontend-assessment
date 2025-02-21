"use client";

import { Dialog } from "@headlessui/react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { CancelIcon, PlusIcon } from "@/public/icons";
import Image from "next/image";

const feeSchema = yup.object().shape({
  feeName: yup.string().required("Fee Name is required"),
  value: yup.number().required("Value is required"),
  currency: yup.string().required("Currency is required"),
  feeFrequency: yup.string().optional(),
  feeImpact: yup.string().optional(),
  accountPaid: yup.string().optional(),
  account: yup.string().optional(),
});

type FeeFormData = yup.InferType<typeof feeSchema>;

interface AddFeeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (data: FeeFormData) => void;
}

const AddFeeModal = ({ isOpen, onClose, onAdd }: AddFeeModalProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    reset,
  } = useForm<FeeFormData>({
    defaultValues: {
      feeName: "",
      value: 0,
      currency: "NGN",
      feeFrequency: "",
      feeImpact: "",
      accountPaid: "None",
      account: "",
    },
    resolver: yupResolver(feeSchema),
  });

  const onSubmit = (data: FeeFormData) => {
    onAdd(data);
    reset();
    onClose();
  };

  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-50">
      <div
        className="fixed inset-0 bg-gray-900/75 transition-opacity"
        aria-hidden="true"
      />

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="fixed inset-0 flex items-center justify-center p-4"
      >
        <Dialog.Panel className="w-full max-w-[30rem] h-[80vh] rounded-lg bg-white shadow-xl overflow-hidden flex flex-col">
          <div className="flex justify-between items-center p-6 border-b">
            <div className="flex items-center gap-2">
              <div className="border border-[#EAECF0] p-4 rounded-lg">
                <Image src={PlusIcon} alt="plus" />
              </div>
              <Dialog.Title className="text-lg font-semibold text-gray-900">
                Add Fee
              </Dialog.Title>
            </div>
            <div onClick={onClose} className="cursor-pointer">
              <Image src={CancelIcon} alt="cancel" />
            </div>
          </div>

          <div className="flex-1 overflow-y-auto no-scrollbar p-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="block text-sm font-medium">Fee Name</label>
                <input
                  type="text"
                  {...register("feeName")}
                  className={`w-full p-2 border rounded ${
                    errors.feeName ? "border-red-500" : "border-gray-300"
                  }`}
                />
                {errors.feeName && (
                  <p className="text-red-500 text-sm">
                    {errors.feeName.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium">Value</label>
                <input
                  type="number"
                  min={0}
                  {...register("value")}
                  className={`w-full p-2 border rounded ${
                    errors.value ? "border-red-500" : "border-gray-300"
                  }`}
                />
                {errors.value && (
                  <p className="text-red-500 text-sm">{errors.value.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium">Currency</label>
                <div className="flex gap-4">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      {...register("currency")}
                      value="NGN"
                      className="mr-2 w-4 h-4 md:w-6 md:h-6"
                    />
                    NGN
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      {...register("currency")}
                      value="USD"
                      className="mr-2 w-4 h-4 md:w-6 md:h-6"
                    />
                    USD
                  </label>
                </div>
                {errors.currency && (
                  <p className="text-red-500 text-sm">
                    {errors.currency.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium">
                  Fee Frequency
                </label>
                <div className="flex gap-4">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      {...register("feeFrequency")}
                      value="OneOff"
                      className="mr-2 w-4 h-4 md:w-6 md:h-6"
                    />
                    One Off
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      {...register("feeFrequency")}
                      value="Monthly"
                      className="mr-2 w-4 h-4 md:w-6 md:h-6"
                    />
                    Monthly
                  </label>
                </div>
                {errors.feeFrequency && (
                  <p className="text-red-500 text-sm">
                    {errors.feeFrequency.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium">Fee Impact</label>
                <div className="flex gap-4">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      {...register("feeImpact")}
                      value="Issuance"
                      className="mr-2 w-4 h-4 md:w-6 md:h-6"
                    />
                    Issuance
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      {...register("feeImpact")}
                      value="Pin Reissue"
                      className="mr-2 w-4 h-4 md:w-6 md:h-6"
                    />
                    Pin Reissue
                  </label>
                </div>
                {errors.feeImpact && (
                  <p className="text-red-500 text-sm">
                    {errors.feeImpact.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium">
                  Account Paid
                </label>
                <div className="flex gap-4">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      {...register("accountPaid")}
                      value="None"
                      className="mr-2 w-4 h-4 md:w-6 md:h-6"
                    />
                    None
                  </label>
                  <label className="flex items-center md:whitespace-nowrap">
                    <input
                      type="radio"
                      {...register("accountPaid")}
                      value="Branch Code Prefix"
                      className="mr-2 w-4 h-4 md:w-6 md:h-6"
                    />
                    Branch Code Prefix
                  </label>
                  <label className="flex items-center md:whitespace-nowrap">
                    <input
                      type="radio"
                      {...register("accountPaid")}
                      value="Branch Code Suffix"
                      className="mr-2 w-4 h-4 md:w-6 md:h-6"
                    />
                    Branch Code Suffix
                  </label>
                </div>
                {errors.accountPaid && (
                  <p className="text-red-500 text-sm">
                    {errors.accountPaid.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium">Account</label>
                <input
                  type="text"
                  {...register("account")}
                  className={`w-full p-2 border rounded ${
                    errors.account ? "border-red-500" : "border-gray-300"
                  }`}
                />
                {errors.account && (
                  <p className="text-red-500 text-sm">
                    {errors.account.message}
                  </p>
                )}
              </div>
            </div>
          </div>

          <div className="border-t p-6">
            <button
              type="submit"
              className={`w-full bg-[#014DAF] text-white py-2 rounded hover:bg-[#013d8c] transition-colors ${
                !isValid && "opacity-70"
              }`}
            >
              Add Fee
            </button>
          </div>
        </Dialog.Panel>
      </form>
    </Dialog>
  );
};

export default AddFeeModal;
