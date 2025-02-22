"use client";

import { SuccessIcon } from "@/public/icons";
import Image from "next/image";

interface SuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  message: string;
}

const SuccessModal = ({
  isOpen,
  onClose,
  title,
  message,
}: SuccessModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-[80%] sm:w-[60%] md:w-[400px] flex flex-col gap-4">
        <div className="w-fit p-4 border border-[#EAECF0] rounded-lg">
          <Image src={SuccessIcon} alt="success" />
        </div>

        <div className="w-full">
          <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
          <p className="text-sm text-gray-600 mt-1">{message}</p>
        </div>

        <button
          onClick={onClose}
          className="mt-2 w-fit bg-[#014DAF] text-white py-2 px-4 rounded-md hover:bg-[#013D8F] transition-colors"
        >
          Continue
        </button>
      </div>
    </div>
  );
};

export default SuccessModal;
