import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import ConfirmDeleteDialog from "@/Features/Payroll/Components/SalarySetup/ConfirmDeleteDialog";
import EditSalarySetupForm from "@/Features/Payroll/Components/SalarySetup/EditSalarySetupForm";
import SearchData from "@/Features/Payroll/Components/SalarySetup/SearchData";
import ShowEntries from "@/Features/Payroll/Components/SalarySetup/ShowEntries";
import { tableColumns } from "@/Features/Payroll/Components/SalarySetup/TableColumns";
import TablePagination from "@/Features/Payroll/Components/SalarySetup/TablePagination";
import {
  deleteSalarySetup,
  removeSalarySetupDeleteId,
  selectSalarySetupData,
  updateTableState,
} from "@/Features/Payroll/payrollSlices/SalarySetup.slice";
import type { ISalarySetup } from "@/Features/Payroll/types/salary-setup.type";
import { useAppDispatch, useAppSelector } from "@/Redux/hook";
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
  type TableState,
} from "@tanstack/react-table";

const SalarySetupTable = () => {
  const { salarySetup, tableState, salarySetupDeleteId } = useAppSelector(
    selectSalarySetupData
  );
  const dispatch = useAppDispatch();

  const table = useReactTable<ISalarySetup>({
    data: salarySetup,
    columns: tableColumns,
    onSortingChange: (updater) =>
      dispatch(updateTableState({ key: "sorting", updater })),
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onRowSelectionChange: (updater) =>
      dispatch(updateTableState({ key: "rowSelection", updater })),
    onPaginationChange: (updater) =>
      dispatch(updateTableState({ key: "pagination", updater })),
    onGlobalFilterChange: (updater) =>
      dispatch(updateTableState({ key: "globalFilter", updater })),
    state: tableState as unknown as Partial<TableState>,
  });

  return (
    <div className="w-full">
      <div className="flex items-center justify-between py-4">
        <ShowEntries table={table} />
        <SearchData table={table} />
      </div>
      <div className="overflow-hidden rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={tableColumns.length}
                  className="h-10 text-center bg-[#F4F4F5]"
                >
                  No results found!
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <TablePagination table={table} />
      <ConfirmDeleteDialog
        open={!!salarySetupDeleteId}
        onOpenChange={(open: boolean) => {
          if (!open) {
            dispatch(removeSalarySetupDeleteId());
          }
        }}
        onConfirm={() => dispatch(deleteSalarySetup())}
      />
      <EditSalarySetupForm />
    </div>
  );
};

export default SalarySetupTable;
