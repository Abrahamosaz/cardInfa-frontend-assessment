import { ColumnDef, Row } from "@tanstack/react-table";
import ActionCell from "./ActionCell";
import { dataProps } from "@/type";

export const CardProfileColumns: ColumnDef<dataProps>[] = [
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
    cell: ({ row }: { row: Row<dataProps> }) => (
      <ActionCell data={row.original} />
    ),
  },
];
