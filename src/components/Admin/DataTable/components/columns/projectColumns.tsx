import type { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { ArrowUpDown } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { type RouterOutputs } from "@/utils/api";
import { format } from "date-fns";
import { DataTableRowActions } from "../DataTableRowActions";

type Project = RouterOutputs["project"]["getAll"][number];

export const projectColumns: ColumnDef<Project>[] = [
  {
    id: "id",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "isEnabled",
    header: "Status",
    cell: ({ row }) => (
      <div className="capitalize">
        <Badge
          variant={
            row.getValue("isEnabled") === true ? "secondary" : "destructive"
          }
        >
          {row.getValue("isEnabled") === true ? "Ativado" : "Desativado"}
        </Badge>{" "}
      </div>
    ),
  },
  {
    accessorKey: "Nome",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Nome
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className="lowercase">
        {row.getValue("name")}
      </div>
    ),
  },
  {
    accessorKey: "createdAt",
    header: () => <div className="text-right">Criado em</div>,
    cell: ({ row }) => {
      return (
        <div className="text-right font-medium">
          {row.getValue("createdAt") ? format(row.getValue("createdAt"), "dd/MM/yyyy -	kk:mm") : "-"}
        </div>
      );
    },
  },
  {
    accessorKey: "updatedAt",
    header: () => <div className="text-right">Atualizado em</div>,
    cell: ({ row }) => {
      return (
        <div className="text-right font-medium">
          {row.getValue("updatedAt") ? format(row.getValue("updatedAt"), "dd/MM/yyyy -	kk:mm") : "-"}
        </div>
      );
    },
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      return <DataTableRowActions row={row} editUrl="/admin/projetos/edit/" />;
    },
  },
];
