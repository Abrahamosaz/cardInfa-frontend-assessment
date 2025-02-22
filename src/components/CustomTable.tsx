import React from "react";
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  ColumnDef,
} from "@tanstack/react-table";
import ReactPaginate from "react-paginate";
import classNames from "classnames";

interface CustomTableProps<T> {
  columns: ColumnDef<T>[];
  data: T[];
  pageCount?: number;
  currentPage?: number;
  onPageChange?: (page: number) => void;
  isLoading?: boolean;
  cellStyle?: string;
  headerStyle?: string;
  showPagination?: boolean;
}

const CustomTable = <T,>({
  columns,
  data,
  pageCount,
  currentPage,
  onPageChange = () => {},
  // isLoading = false,
  cellStyle = "",
  headerStyle = "",
  showPagination = true,
}: CustomTableProps<T>) => {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  const handlePageChange = ({ selected }: { selected: number }) => {
    onPageChange(selected);
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="relative overflow-x-auto hide-scroll">
        <table className="min-w-full">
          <thead className="bg-[#F1F9FF]">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header, index) => (
                  <th
                    key={header.id}
                    className={classNames(
                      "px-6 py-3 text-xs font-mediumuppercase tracking-wider",
                      headerStyle,
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
                      "px-6 py-4 whitespace-nowrap text-sm",
                      cellStyle,
                      {
                        "sticky left-0 z-20 bg-white shadow-[2px_0_5px_-2px_rgba(0,0,0,0.1)] text-left":
                          index === 0,
                        "text-center": index !== 0,
                      }
                    )}
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showPagination && pageCount != null && currentPage != null ? (
        <ReactPaginate
          previousLabel={
            <span className="flex items-center gap-1">
              <svg
                width="6"
                height="10"
                viewBox="0 0 6 10"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M5 9L1 5L5 1"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              Previous
            </span>
          }
          nextLabel={
            <span className="flex items-center gap-1">
              Next
              <svg
                width="6"
                height="10"
                viewBox="0 0 6 10"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M1 1L5 5L1 9"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
          }
          breakLabel="..."
          pageCount={pageCount}
          marginPagesDisplayed={1}
          pageRangeDisplayed={3}
          onPageChange={handlePageChange}
          forcePage={currentPage}
          containerClassName="flex items-center justify-center gap-2 mt-4"
          previousClassName={classNames(
            "px-4 py-2 text-sm rounded-lg border border-[#E4E4E4] text-[#134A70] hover:bg-gray-50 transition-colors",
            { "opacity-50 cursor-not-allowed": currentPage === 0 }
          )}
          nextClassName={classNames(
            "px-4 py-2 text-sm rounded-lg border border-[#E4E4E4] text-[#134A70] hover:bg-gray-50 transition-colors",
            { "opacity-50 cursor-not-allowed": currentPage === pageCount - 1 }
          )}
          pageClassName="px-3 py-2 text-sm rounded-lg border border-[#E4E4E4] text-[#134A70] hover:bg-gray-50 transition-colors"
          breakClassName="text-[#134A70]"
          activeClassName="!bg-[#134A70] !text-white !border-[#134A70]"
          disabledClassName="opacity-50 cursor-not-allowed hover:bg-white"
          renderOnZeroPageCount={null}
        />
      ) : null}
    </div>
  );
};

export default CustomTable;
