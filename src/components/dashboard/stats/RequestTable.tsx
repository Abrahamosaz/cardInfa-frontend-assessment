"use client";
import { CgArrowsExpandRight } from "react-icons/cg";
import classNames from "classnames";
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  ColumnDef,
  Row,
} from "@tanstack/react-table";
import { CardRequestdataProps } from "@/type";
import CardRequestActionCell from "@/components/card/cardRequest/CardRequestActionCell";
import { useMemo } from "react";
import { cardRequestData } from "@/contants";

const RequestTable = () => {
  const columns = useMemo<ColumnDef<CardRequestdataProps>[]>(
    () => [
      {
        header: "Branch",
        accessorKey: "branch",
      },
      {
        header: "Card Type",
        accessorKey: "initiator",
      },
      {
        header: "Quantity",
        accessorKey: "quantity",
      },
      {
        header: "Status",
        accessorKey: "status",
        cell: ({ row }: { row: Row<CardRequestdataProps> }) => (
          <div className="w-full flex justify-center">
            <div
              className={classNames({
                "text-center p-2 px-4 rounded-3xl border w-fit": true,
                "border-[#ABEFC6] bg-[#ECFDF3]":
                  row.original.status === "Ready",
                "border-[#FEDF89] bg-[#FFFAEB]":
                  row.original.status === "In Progress",
                "border-[#EAECF0] bg-[#F9FAFB]":
                  row.original.status === "Pending",
                "border-[#B2DDFF] bg-[#EFF8FF]":
                  row.original.status === "Acknowledged",
              })}
            >
              {row.original.status}
            </div>
          </div>
        ),
      },
      {
        header: "Action",
        id: "action",
        cell: ({ row }: { row: Row<CardRequestdataProps> }) => (
          <CardRequestActionCell data={row.original} />
        ),
      },
    ],
    []
  );

  const table = useReactTable({
    data: cardRequestData,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="w-full bg-white border border-[#E2E2E2] rounded-xl px-4 py-4">
      <div className="flex items-center justify-between">
        <p className="text-lg font-medium text-[#121212]">
          Recent Card Requests
        </p>
        <CgArrowsExpandRight className="cursor-pointer text-xl text-[#D0D5DD]" />
      </div>

      <div className="flex flex-col gap-4 mt-8">
        <div className="relative overflow-x-auto no-scrollbar">
          <table className="min-w-full">
            <thead className="bg-[#F1F9FF]">
              {table.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map((header, index) => (
                    <th
                      key={header.id}
                      className={classNames(
                        "px-6 py-3 text-xs font-mediumuppercase tracking-wider",
                        {
                          "sticky left-0 z-20 shadow-[2px_0_5px_-2px_rgba(0,0,0,0.1)] text-left":
                            index === 0,
                          "text-center": index !== 0,
                        }
                      )}
                    >
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {table.getRowModel().rows.map((row) => (
                <tr onClick={() => {}} key={row.id}>
                  {row.getVisibleCells().map((cell, index) => (
                    <td
                      key={cell.id}
                      className={classNames(
                        "px-6 py-2 whitespace-nowrap text-sm",
                        {
                          "sticky left-0 z-20 bg-white shadow-[2px_0_5px_-2px_rgba(0,0,0,0.1)] text-left":
                            index === 0,
                          "text-center": index !== 0,
                        }
                      )}
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default RequestTable;
