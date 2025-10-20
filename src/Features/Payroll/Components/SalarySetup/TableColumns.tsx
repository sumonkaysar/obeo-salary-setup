import TableActions from "@/Features/Payroll/Components/SalarySetup/TableActions";
import TableColumnHeader from "@/Features/Payroll/Components/SalarySetup/TableColumnHeader";
import type { ISalarySetup } from "@/Features/Payroll/types/salary-setup.type";
import type { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";

export const tableColumns: ColumnDef<ISalarySetup>[] = [
  {
    accessorKey: "sl",
    header: ({ column }) => (
      <TableColumnHeader column={column} columnName="SL" />
    ),
    cell: ({ row }) => <div className="px-3">{row.index + 1}</div>,
    enableHiding: false,
    sortingFn: (rowA, rowB) => {
      return rowA.index + 1 - (rowB.index + 1);
    },
  },
  {
    id: "employeeName",
    accessorFn: (row) => `${row.firstName} ${row.lastName}`,
    header: ({ column }) => (
      <TableColumnHeader column={column} columnName="Employee Name" />
    ),
    cell: ({ row }) => (
      <div className="px-3">
        {row.original.firstName} {row.original.lastName}
      </div>
    ),
  },
  {
    accessorKey: "employeeId",
    header: ({ column }) => (
      <TableColumnHeader column={column} columnName="Employee Id" />
    ),
    cell: ({ row }) => <div className="px-3">{row.getValue("employeeId")}</div>,
  },
  {
    accessorKey: "type",
    header: ({ column }) => (
      <TableColumnHeader column={column} columnName="Salary Type" />
    ),
    cell: ({ row }) => <div className="px-3">{row.getValue("type")}</div>,
  },

  {
    accessorKey: "date",
    header: ({ column }) => (
      <TableColumnHeader column={column} columnName="Date" />
    ),
    cell: ({ row }) => (
      <div className="px-3">{format(row.getValue("date"), "do MMM yyyy")}</div>
    ),
  },
  {
    id: "actions",
    enableHiding: false,
    header: () => <div className="text-center">Actions</div>,
    cell: ({ row }) => {
      const { _id } = row.original;
      return <TableActions id={_id} />;
    },
  },
];
