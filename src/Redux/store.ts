import salarySetupReducer from "@/Features/Payroll/payrollSlices/SalarySetup.slice";
import { baseApi } from "@/Redux/baseApi";
import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";

export const store = configureStore({
  reducer: {
    salarySetup: salarySetupReducer,
    [baseApi.reducerPath]: baseApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["candidateSelection/updateTableState"],
        ignoredActionPaths: ["payload.updater"],
      },
    }).concat(baseApi.middleware),
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
