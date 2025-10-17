import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  addSalarySetup,
  selectSalarySetupData,
} from "@/Features/Payroll/payrollSlices/SalarySetup.slice";
import { salarySetupZodSchema } from "@/Features/Payroll/validations/salary-setup.validation";
import { useAppDispatch, useAppSelector } from "@/Redux/hook";
import { zodResolver } from "@hookform/resolvers/zod";
import { Plus } from "lucide-react";
import { useRef } from "react";
import { useForm } from "react-hook-form";
import type z from "zod";

const SalarySetupForm = () => {
  const { employees, salaryTypes } = useAppSelector(selectSalarySetupData);
  const closeBtnRef = useRef<HTMLButtonElement>(null);
  const dispatch = useAppDispatch();
  const form = useForm({
    resolver: zodResolver(salarySetupZodSchema),
    defaultValues: {
      employee: "",
      salaryType: "",
    },
  });

  const handleSubmit = async (data: z.infer<typeof salarySetupZodSchema>) => {
    try {
      const selectedEmployee = employees.find(
        (employee) => employee._id === data.employee
      );
      const selectedType = salaryTypes.find(
        (type) => type._id === data.salaryType
      );
      const setupData = {
        _id: Number(
          `${
            Math.floor(Math.random() * (10000000 - 99999999 + 1)) + 99999999
          }${new Date().getTime()}`
        )
          .toString(16)
          .padStart(17, "0"),
        employee: data.employee,
        firstName: selectedEmployee?.firstName,
        lastName: selectedEmployee?.lastName,
        employeeId: selectedEmployee?.employeeId,
        salaryType: data.salaryType,
        type: selectedType?.salaryType,
        date: new Date().toISOString(),
      };

      dispatch(addSalarySetup(setupData));
      if (closeBtnRef.current) {
        closeBtnRef.current.click();
      }
      form.reset();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Dialog>
      <form>
        <DialogTrigger asChild>
          <Button>
            <Plus /> Add Salary Setup
          </Button>
        </DialogTrigger>
        <DialogContent
          className="p-0 overflow-hidden min-w-11/12"
          aria-describedby="addSalarySetup"
        >
          <DialogHeader className="sr-only">
            <DialogTitle className="text-xl">Add Salary Setup</DialogTitle>
            <DialogDescription>
              Here you will add salary setup
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4">
            <div className="border">
              <h2 className="text-xl font-semibold border-b pt-1 pb-3 px-4">
                Salary Setup
              </h2>
              <Form {...form}>
                <form
                  id="addSalarySetup"
                  onSubmit={form.handleSubmit(handleSubmit)}
                  className="space-y-6 px-6 py-4"
                >
                  <FormField
                    control={form.control}
                    name="employee"
                    render={({ field }) => (
                      <FormItem className="grid grid-cols-[1fr_3fr] gap-4">
                        <FormLabel className="justify-end text-[#212529]">
                          Employee<span className="text-red-500">*</span>
                        </FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger className="w-full">
                              <SelectValue placeholder="Select an employee" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {employees.map((employee) => (
                              <SelectItem
                                key={employee._id}
                                value={employee._id}
                              >
                                {employee.firstName} {employee.lastName} (
                                {employee.employeeId})
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormDescription className="sr-only">
                          Select an employee
                        </FormDescription>
                        <div />
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="salaryType"
                    render={({ field }) => (
                      <FormItem className="grid grid-cols-[1fr_3fr] gap-4">
                        <FormLabel className="justify-end text-[#212529]">
                          Salary Type<span className="text-red-500">*</span>
                        </FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger className="w-full">
                              <SelectValue placeholder="Select a Salary Type" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {salaryTypes.map((type) => (
                              <SelectItem key={type._id} value={type._id}>
                                {type.salaryType}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormDescription className="sr-only">
                          Select a salary type
                        </FormDescription>
                        <div />
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </form>
              </Form>
            </div>
          </div>
          <DialogFooter className="p-4">
            <DialogClose asChild>
              <Button type="button" ref={closeBtnRef} variant="outline">
                Cancel
              </Button>
            </DialogClose>
            <Button type="submit" form="addSalarySetup">
              Save changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  );
};

export default SalarySetupForm;
