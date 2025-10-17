import type { ITableState } from "@/Features/Payroll/types";
import type { IEmployee } from "@/Features/Payroll/types/employee.type";
import type { ISalaryType } from "@/Features/Payroll/types/salary-type-setup.type";

export interface ISalarySetup {
  _id: string;
  employee: string;
  firstName: string;
  lastName: string;
  employeeId: string;
  salaryType: string;
  type: string;
  date: string;
}

export interface ISalarySetupState {
  employees: IEmployee[];
  salaryTypes: ISalaryType[];
  salarySetup: ISalarySetup[];
  tableState: ITableState;
  salarySetupEditId: string;
  salarySetupDeleteId: string;
}
