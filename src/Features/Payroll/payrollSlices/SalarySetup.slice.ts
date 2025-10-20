import { employeesData } from "@/Features/Payroll/consts/employees.const";
import { salarySetupData } from "@/Features/Payroll/consts/salary-setup.const";
import { salaryTypesData } from "@/Features/Payroll/consts/salary-type-setup.const";
import type { ITableState } from "@/Features/Payroll/types";
import type { ISalarySetupState } from "@/Features/Payroll/types/salary-setup.type";
import type { RootState } from "@/Redux/store";
import { createSlice, current, type PayloadAction } from "@reduxjs/toolkit";
import type { Updater } from "@tanstack/react-table";
import { toast } from "sonner";

const initialState: ISalarySetupState = {
  employees: employeesData,
  salaryTypes: salaryTypesData,
  salarySetup: salarySetupData,
  tableState: {
    globalFilter: "",
    sorting: [{ desc: false, id: "sl" }],
    rowSelection: {},
    pagination: {
      pageIndex: 0,
      pageSize: 10,
    },
  },
  salarySetupEditId: "",
  salarySetupDeleteId: "",
};

export const salarySetupSlice = createSlice({
  name: "salarySetup",
  initialState,
  reducers: {
    addSalarySetup: (state, action) => {
      state.salarySetup = [...state.salarySetup, action.payload];
      toast.success("Salary setup added succesfully");
      console.log(current(state));
    },
    selectSalarySetupEditId: (state, action) => {
      state.salarySetupEditId = action.payload;
    },
    removeSalarySetupEditId: (state) => {
      state.salarySetupEditId = "";
    },
    selectSalarySetupDeleteId: (state, action) => {
      state.salarySetupDeleteId = action.payload;
    },
    removeSalarySetupDeleteId: (state) => {
      state.salarySetupDeleteId = "";
    },
    editSalarySetup: (state, action) => {
      const index = state.salarySetup.findIndex(
        (c) => c._id === state.salarySetupEditId
      );
      state.salarySetup[index] = {
        ...state.salarySetup[index],
        ...action.payload,
      };
      toast.success("Salary setup updated succesfully");
      state.salarySetupEditId = "";
    },
    deleteSalarySetup: (state) => {
      state.salarySetup = state.salarySetup.filter(
        (s) => s._id !== state.salarySetupDeleteId
      );
      toast.success("Salary setup deleted succesfully");
      state.salarySetupDeleteId = "";
    },
    updateTableState: (
      state,
      action: PayloadAction<{
        key: keyof ITableState;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        updater: Updater<any>;
      }>
    ) => {
      const { key, updater } = action.payload;

      const currentValue = state.tableState[key];
      const newValue =
        typeof updater === "function" ? updater(currentValue) : updater;

      state.tableState[key] = newValue;
    },
  },
});

export const {
  addSalarySetup,
  selectSalarySetupEditId,
  removeSalarySetupEditId,
  selectSalarySetupDeleteId,
  removeSalarySetupDeleteId,
  editSalarySetup,
  deleteSalarySetup,
  updateTableState,
} = salarySetupSlice.actions;

export const selectSalarySetupData = (state: RootState) => state.salarySetup;

export default salarySetupSlice.reducer;
