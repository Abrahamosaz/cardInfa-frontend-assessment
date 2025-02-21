"use client";

import React, { useState } from "react";
import Image from "next/image";
import { DeleteIcon, EditIcon } from "@/public/icons";
import useCardProfileStore from "@/store/card.store";
import { dataProps } from "@/type";
import ConfirmDeleteModal from "../modals/ConfirmDeleteModal";
import toast from "react-hot-toast";

const ActionCell = ({ data }: { data: dataProps }) => {
  const { deleteCardProfile } = useCardProfileStore();
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const handleDelete = () => {
    deleteCardProfile(data.id);
    toast.success("Card profile deleted successfully");
  };

  return (
    <>
      <div className="w-full flex items-center justify-center gap-3 md:gap-5">
        <Image
          className="cursor-pointer"
          src={DeleteIcon}
          alt="delete"
          onClick={() => setIsDeleteModalOpen(true)}
        />
        <Image className="cursor-pointer" src={EditIcon} alt="edit" />
      </div>

      <ConfirmDeleteModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleDelete}
        title="Delete Card Profile"
        message="Are you sure you want to delete this card profile? This action cannot be undone."
      />
    </>
  );
};

export default ActionCell;
