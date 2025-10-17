import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
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
import { salaryTypesData } from "@/Features/Payroll/consts/salary-type-setup.const";
import {
  editSalarySetup,
  removeSalarySetupEditId,
  selectSalarySetupData,
} from "@/Features/Payroll/payrollSlices/SalarySetup.slice";
import { salarySetupUpdateZodSchema } from "@/Features/Payroll/validations/salary-setup.validation";
import { useAppDispatch, useAppSelector } from "@/Redux/hook";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import type z from "zod";

const EditSalarySetupForm = () => {
  const { salarySetup, salaryTypes, salarySetupEditId } = useAppSelector(
    selectSalarySetupData
  );
  const dispatch = useAppDispatch();
  const prevData = salarySetup.find((s) => s._id === salarySetupEditId);
  const form = useForm({
    resolver: zodResolver(salarySetupUpdateZodSchema),
    values: {
      salaryType: prevData?.salaryType || "",
    },
  });

  const handleSubmit = async (
    data: z.infer<typeof salarySetupUpdateZodSchema>
  ) => {
    try {
      const updatedData = {
        salaryType: data.salaryType,
        type: salaryTypes.find((type) => type._id === data.salaryType)
          ?.salaryType,
      };

      dispatch(editSalarySetup(updatedData));
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Dialog
      open={!!salarySetupEditId}
      onOpenChange={(open: boolean) => {
        if (!open) {
          dispatch(removeSalarySetupEditId());
        }
      }}
    >
      <DialogContent
        className="p-0 overflow-hidden min-w-11/12"
        aria-describedby="EditSalarySetup"
      >
        <DialogHeader className="sr-only">
          <DialogTitle className="text-xl">Edit Salary Setup</DialogTitle>
          <DialogDescription>Here you will Edit Salary Setup</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4">
          <div className="border">
            <h2 className="text-xl font-semibold border-b pt-1 pb-3 px-4">
              Edit Salary Setup
            </h2>
            <Form {...form}>
              <form
                id="editSalarySetup"
                onSubmit={form.handleSubmit(handleSubmit)}
                className="space-y-6 px-6 py-4"
              >
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
                          {salaryTypesData.map((type) => (
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
            <Button type="button" variant="outline">
              Cancel
            </Button>
          </DialogClose>
          <Button type="submit" form="editSalarySetup">
            Save changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default EditSalarySetupForm;
