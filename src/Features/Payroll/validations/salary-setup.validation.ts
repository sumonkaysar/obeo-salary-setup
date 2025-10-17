import z from "zod";

export const salarySetupZodSchema = z.object({
  employee: z
    .string({
      error: (issue) =>
        issue.input === undefined
          ? "Employee is required"
          : "Employee must be a string",
    })
    .nonempty("Employee can't be blank"),
  salaryType: z
    .string({
      error: (issue) =>
        issue.input === undefined
          ? "Salary type is required"
          : "Salary type must be a string",
    })
    .nonempty("Salary type can't be blank"),
});

export const salarySetupUpdateZodSchema = z.object({
  salaryType: z
    .string("Salary type must be a string")
    .nonempty("Salary type can't be blank")
    .optional(),
});
