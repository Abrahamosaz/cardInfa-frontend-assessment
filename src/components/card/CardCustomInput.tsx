import React, { forwardRef, InputHTMLAttributes } from "react";

type CardCustomInputProps = InputHTMLAttributes<HTMLInputElement> & {
  placeholder: string;
  label: string;
  htmlFor: string;
  error: string;
  type?: string;
  required?: boolean;
};

const CardCustomInput = forwardRef<HTMLInputElement, CardCustomInputProps>(
  (
    { placeholder, label, htmlFor, error, type = "text", required, ...props },
    ref
  ) => {
    return (
      <div className="w-full">
        <div className="w-ful flex flex-col gap-2">
          <label className="text-[#344054]">
            {label}
            {required && <span>*</span>}
          </label>

          <div className="flex flex-col gap-1">
            <input
              ref={ref}
              id={htmlFor}
              type={type}
              placeholder={placeholder}
              className="w-full  bg-transparent outline-none border border-[#D0D5DD] rounded-lg px-4 py-2 placeholder:text-[#667085]"
              {...props}
            />

            {error ? (
              <p className="flex self-start text-red-500 font-semibold mt-0.5 text-xs md:text-sm">
                {error}
              </p>
            ) : null}
          </div>
        </div>
      </div>
    );
  }
);

// Add display name for dev tools
CardCustomInput.displayName = "Input";

export default CardCustomInput;
