"use client";

import { yupResolver } from "@hookform/resolvers/yup";
import React, { useMemo, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import Select from "react-select";
import * as yup from "yup";
import CardCustomInput from "../CardCustomInput";
import { IoIosAdd } from "react-icons/io";
import CustomTable from "../../CustomTable";
import AddFeeModal from "../../modals/AddFeeModal";
import toast from "react-hot-toast";
import classNames from "classnames";
import useCardProfileStore from "@/store/cardProfile.store";
import { useRouter } from "next/navigation";

// Define the type for select options
type CardSchemeOption = {
  value: string;
  label: string;
};

type FeeDataProps = {
  name: string;
  value: string;
  frequency: string;
  currency: string;
  time: string;
  accountPaid: string;
  account: string;
};

const cardSchemeOptions: CardSchemeOption[] = [
  { value: "verve", label: "Verve" },
  { value: "mastercard", label: "Mastercard" },
  { value: "visa", label: "Visa" },
];

const branchBlacklistOptions = [
  { value: "branch1", label: "Branch 1" },
  { value: "branch2", label: "Branch 2" },
  { value: "branch3", label: "Branch 3" },
];

const schema = yup.object().shape({
  cardName: yup.string().required("Card Name is required"),
  cardScheme: yup
    .object()
    .shape({
      value: yup.string().required(),
      label: yup.string().required(),
    })
    .required(),
  binPrefix: yup.number().required("Bin prefix is required"),
  expiration: yup.number().required("Expiration is required"),
  currency: yup.string().required("currency is required"),
  description: yup.string().optional(),
  branchBlacklist: yup
    .object()
    .shape({
      value: yup.string().optional(),
      label: yup.string().optional(),
    })
    .optional(),
});

type CreateProfileFormData = yup.InferType<typeof schema>;

const AddFeeComponent = ({
  data: fees,
  onAction,
}: {
  data: FeeDataProps[];
  onAction: () => void;
}) => {
  const columns = useMemo(
    () => [
      {
        header: "Name",
        accessorKey: "name",
      },

      {
        header: "Value",
        accessorKey: "value",
      },

      {
        header: "Frequency",
        accessorKey: "frequency",
      },
      {
        header: "Currency",
        accessorKey: "currency",
      },

      {
        header: "Time",
        accessorKey: "time",
      },

      {
        header: "Account Paid",
        accessorKey: "accountPaid",
      },

      {
        header: "Account",
        accessorKey: "account",
      },
    ],
    []
  );

  const data = useMemo(() => {
    return fees?.length > 0
      ? fees
      : [
          {
            name: "",
            value: "",
            frequency: "",
            currency: "",
            time: "",
            accountPaid: "",
            account: "",
          },
        ];
  }, [fees]);

  return (
    <div className="w-full bg-white rounded-lg border border-[#E2E2E2] p-4 pb-6 flex flex-col gap-4">
      <h3 className="text-lg font-semibold text-[#121212]">Fees</h3>

      <div className="flex flex-col gap-4 mt-2">
        <div
          onClick={onAction}
          className="cursor-pointer w-fit py-2 px-4 flex items-center text-white bg-[#014DAF] rounded-[4px]"
        >
          <IoIosAdd className="text-white w-6 h-6" />
          <p>Add Fees</p>
        </div>

        <div className="w-full mb-10">
          <CustomTable
            columns={columns}
            data={data}
            showPagination={false}
            headerStyle="bg-[#F9FAFB] border border-[#EAECF0] text-[#475467]"
            cellStyle="border border-[#EAECF0] text-[#475467]"
          />
        </div>
      </div>
    </div>
  );
};

const CreateProfile = () => {
  const [isAddFeeModalOpen, setIsAddFeeModalOpen] = useState(false);
  const [fees, setFees] = useState<FeeDataProps[]>([]);

  const router = useRouter();

  const form = useForm<CreateProfileFormData>({
    defaultValues: {
      cardName: "",
      cardScheme: {},
      expiration: 0,
      binPrefix: 0,
      currency: "",
      description: "",
      branchBlacklist: {},
    },
    resolver: yupResolver(schema),
    mode: "onBlur",
  });

  const { register, handleSubmit, formState, control } = form;
  const { errors, isValid } = formState;

  const { addCardProfile, cardProfiles } = useCardProfileStore();

  const handleAddFee = (feeData: any) => {
    setFees([
      ...fees,
      {
        name: feeData.feeName,
        value: feeData.value,
        frequency: feeData.feeFrequency,
        currency: feeData.currency,
        time: new Date().toISOString(),
        accountPaid: feeData.accountPaid,
        account: feeData.account,
      },
    ]);
    toast.success("Fee added successfully");
  };

  const onSubmit = (data: CreateProfileFormData) => {
    const nextId =
      cardProfiles.length > 0
        ? Math.max(...cardProfiles.map((profile) => profile.id)) + 1
        : 1;

    addCardProfile({
      id: nextId,
      name: data.cardName,
      currency: data.currency,
      binPrefix: data.binPrefix,
      expiration: data.expiration,
      createdAt: new Date().toISOString(),
    });

    toast.success("Card Profile created successfully");
    router.back();
  };

  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        noValidate
        className="w-full flex flex-col gap-4"
      >
        <div className="w-full bg-white rounded-lg border border-[#E2E2E2] p-4 pb-6 flex flex-col gap-4">
          <h3 className="text-lg font-semibold text-[#121212]">
            Profile Details
          </h3>
          <div className="w-full md:w-[80%]">
            <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-x-20 gap-y-4">
              <CardCustomInput
                label="Card Name"
                placeholder="Enter Card Name"
                htmlFor="cardName"
                error={errors.cardName?.message ?? ""}
                required
                {...register("cardName")}
              />

              <CardCustomInput
                label="Bin Prefix"
                placeholder="Enter Bin Prefix"
                htmlFor="binPrefix"
                error={errors.binPrefix?.message ?? ""}
                type="number"
                required
                {...register("binPrefix")}
              />

              <div className="w-full">
                <div className="w-full flex flex-col gap-4">
                  <label>
                    Card Scheme<span>*</span>
                  </label>
                  <div className="flex flex-col gap-1">
                    <Controller
                      name="cardScheme"
                      control={control}
                      render={({ field: { onChange, value, ref } }) => (
                        <Select
                          ref={ref}
                          instanceId="card-scheme-select"
                          value={cardSchemeOptions.find(
                            (option) => option.value === value?.value
                          )}
                          onChange={(option) => onChange(option)}
                          options={cardSchemeOptions}
                          placeholder="Select Card Scheme"
                          className="w-full"
                          classNames={{
                            control: (state) =>
                              `bg-transparent border ${
                                errors.cardScheme
                                  ? "border-red-500"
                                  : "border-[#00000033]"
                              } rounded !min-h-[42px]`,
                          }}
                        />
                      )}
                    />
                    {errors.cardScheme && (
                      <p className="flex self-start text-red-500 font-semibold mt-0.5 text-xs md:text-sm">
                        Card Scheme is required
                      </p>
                    )}
                  </div>
                </div>
              </div>

              <CardCustomInput
                label="Expiration"
                placeholder="0"
                htmlFor="expiration"
                error={errors.expiration?.message ?? ""}
                required
                type="number"
                {...register("expiration")}
              />

              <CardCustomInput
                label="Description"
                placeholder=""
                htmlFor="description"
                error={errors.description?.message ?? ""}
                type="text"
                {...register("description")}
              />

              <CardCustomInput
                label="Currency"
                placeholder="NGN"
                htmlFor="currency"
                error={errors.currency?.message ?? ""}
                required
                type="text"
                {...register("currency")}
              />

              <div className="w-full">
                <div className="w-full flex flex-col gap-2">
                  <label>Branch Blacklist</label>
                  <div className="flex flex-col gap-1">
                    <Controller
                      name="branchBlacklist"
                      control={control}
                      render={({ field: { onChange, value, ref } }) => (
                        <Select
                          ref={ref}
                          instanceId="branch-blacklist-select"
                          value={branchBlacklistOptions.find(
                            (option) => option.value === value?.value
                          )}
                          onChange={(option) => onChange(option)}
                          options={branchBlacklistOptions}
                          placeholder="Select Branch Blacklist"
                          className="w-full"
                          classNames={{
                            control: (state) =>
                              `bg-transparent border ${
                                errors.branchBlacklist
                                  ? "border-red-500"
                                  : "border-[#00000033]"
                              } rounded !min-h-[42px]`,
                          }}
                        />
                      )}
                    />
                    {errors.branchBlacklist && (
                      <p className="flex self-start text-red-500 font-semibold mt-0.5 text-xs md:text-sm">
                        {errors.branchBlacklist.message}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <AddFeeComponent
          data={fees}
          onAction={() => setIsAddFeeModalOpen(true)}
        />

        <button
          className={classNames({
            "mt-5 mb-10 bg-[#014DAF] text-white py-2 w-[50%] sm:w-[40%] md:w-[25%] rounded":
              true,
            "opacity-70": !isValid,
          })}
          type="submit"
        >
          Create Profile
        </button>
      </form>

      <AddFeeModal
        isOpen={isAddFeeModalOpen}
        onClose={() => setIsAddFeeModalOpen(false)}
        onAdd={handleAddFee}
      />
    </>
  );
};

export default CreateProfile;
