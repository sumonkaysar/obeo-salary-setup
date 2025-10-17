import { Button } from "@/components/ui/button";
import SalarySetupForm from "@/Features/Payroll/Components/SalarySetup/SalarySetupForm";
import SalarySetupTable from "@/Features/Payroll/Components/SalarySetup/SalarySetupTable";

const SalarySetup = () => {
  return (
    <div className="px-3 py-2 bg-[#F4F4F5] min-h-screen">
      <div className="bg-white shadow-md rounded-xs mx-auto border">
        <div className="flex justify-between items-center border-b py-3 px-4">
          <h2 className="text-xl font-semibold">Salary Setup</h2>
          <div className="flex items-center gap-3">
            <SalarySetupForm />
            <Button>Manage Salary Setup</Button>
          </div>
        </div>
        <div className="px-4 py-3">
          <SalarySetupTable />
        </div>
      </div>
    </div>
  );
};

export default SalarySetup;
