import React from "react";

const Container = ({
  children,
  title,
}: {
  children: React.ReactNode;
  title: string;
}) => {
  return (
    <div className="w-full flex flex-col gap-4">
      <div className="flex flex-col">
        <h2 className="text-2xl text-[#101828] font-semibold">Card Profile</h2>
        <p className="text-[#475467]">{title}</p>
      </div>

      <div className="w-full">{children}</div>
    </div>
  );
};

export default Container;
