import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  selectSalarySetupDeleteId,
  selectSalarySetupEditId,
} from "@/Features/Payroll/payrollSlices/SalarySetup.slice";
import { useAppDispatch } from "@/Redux/hook";
import { MoreVertical } from "lucide-react";

const TableActions = ({ id }: { id: string }) => {
  const dispatch = useAppDispatch();

  return (
    <div className="flex justify-center">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <MoreVertical />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem
            onClick={() => dispatch(selectSalarySetupEditId(id))}
          >
            Edit
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => dispatch(selectSalarySetupDeleteId(id))}
            className="text-red-600"
          >
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default TableActions;
