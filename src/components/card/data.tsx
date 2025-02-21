import { ColumnDef, Row } from "@tanstack/react-table";
import CardProfileActionCell from "./cardProfile/CardProfileActionCell";
import { CardProfiledataProps, CardRequestdataProps } from "@/type";
import CardRequestActionCell from "./cardRequest/CardRequestActionCell";
import classNames from "classnames";

export const CardProfileColumns: ColumnDef<CardProfiledataProps>[] = [
  {
    header: "Card Name",
    accessorKey: "name",
  },
  {
    header: "Currency",
    accessorKey: "currency",
  },
  {
    header: "Expiration",
    accessorKey: "expiration",
    cell: (props: any) => {
      return <div className="text-center">{`${props.getValue()} months`}</div>;
    },
  },
  {
    header: "Bin Prefix",
    accessorKey: "binPrefix",
  },
  {
    header: "Date Created",
    accessorKey: "createdAt",
    cell: (props: any) => {
      const date = new Date(props.getValue());
      return date.toLocaleDateString();
    },
  },
  {
    header: "Action",
    id: "action",
    cell: ({ row }: { row: Row<CardProfiledataProps> }) => (
      <CardProfileActionCell data={row.original} />
    ),
  },
];

export const CardRequestColumns: ColumnDef<CardRequestdataProps>[] = [
  {
    header: "Branch",
    accessorKey: "branch",
  },
  {
    header: "Initiator",
    accessorKey: "initiator",
  },
  {
    header: "Quantity",
    accessorKey: "quantity",
  },
  {
    header: "Batch",
    accessorKey: "batch",
  },
  {
    header: "Date Requested",
    accessorKey: "dateRequested",
    cell: (props: any) => {
      const date = props.getValue() ? new Date(props.getValue()) : new Date();

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

      return (
        <div className="text-center">{`${formattedDate} ${formattedTime}`}</div>
      );
    },
  },
  {
    header: "Status",
    accessorKey: "status",
    cell: ({ row }: { row: Row<CardRequestdataProps> }) => (
      <div className="w-full flex justify-center">
        <div
          className={classNames({
            "text-center p-2 px-4 rounded-3xl border w-fit": true,
            "border-[#ABEFC6] bg-[#ECFDF3]": row.original.status === "Ready",
            "border-[#FEDF89] bg-[#FFFAEB]":
              row.original.status === "In Progress",
            "border-[#EAECF0] bg-[#F9FAFB]": row.original.status === "Pending",
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
];
