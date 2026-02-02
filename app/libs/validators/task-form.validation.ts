import { z } from "zod";

export const taskStatusEnum = z.enum(["todo", "in-development", "validation", "done"]);
export type TaskStatus = z.infer<typeof taskStatusEnum>;

export const taskFormSchema = z.object({
  title: z
    .string()
    .min(1, { message: "عنوان تسک الزامی است" })
    .min(3, { message: "عنوان باید حداقل ۳ کاراکتر باشد" })
    .max(100, { message: "عنوان نمی‌تواند بیشتر از ۱۰۰ کاراکتر باشد" })
    .refine(
      (val) => val.trim().length >= 3,
      { message: "عنوان باید حداقل ۳ کاراکتر معتبر داشته باشد" }
    ),

  description: z
    .string()
    .optional()
    .refine(
      (val) => !val || val.trim().length > 0,
      { message: "توضیحات نمی‌تواند فقط شامل فاصله باشد" }
    )
    .refine((val) => !val || val.length >= 5, {
      message: "توضیحات باید حداقل ۵ کاراکتر باشد"
    })
    .refine((val) => !val || val.length <= 2000, {
      message: "توضیحات نمی‌تواند بیشتر از ۲۰۰۰ کاراکتر باشد"
    })
    .transform((val) => val?.trim() || undefined),

  assign: z
    .string()
    .min(1, { message: "انتساب به فرد الزامی است" })
    .refine(
      (val) => val.trim().length > 0,
      { message: "انتساب باید به یک فرد معتبر باشد" }
    ),

  status: taskStatusEnum
});

export type TaskFormType = z.infer<typeof taskFormSchema>;

export const taskFormSchemaStrict = z.object({
  title: z
    .string()
    .min(1, { message: "عنوان تسک الزامی است" })
    .min(3, { message: "عنوان باید حداقل ۳ کاراکتر باشد" })
    .max(100, { message: "عنوان نمی‌تواند بیشتر از ۱۰۰ کاراکتر باشد" })
    .regex(/^[\u0600-\u06FFa-zA-Z0-9\s\-_.،؛:]+$/, {
      message: "عنوان شامل کاراکترهای غیرمجاز است. فقط حروف، اعداد و علائم نگارشی ساده مجاز هستند"
    })
    .refine(
      (val) => val.trim().length >= 3,
      { message: "عنوان باید حداقل ۳ کاراکتر معتبر داشته باشد" }
    ),

  description: z
    .string()
    .optional()
    .refine(
      (val) => !val || val.trim().length > 0,
      { message: "توضیحات نمی‌تواند فقط شامل فاصله باشد" }
    )
    .refine((val) => !val || val.length >= 10, {
      message: "توضیحات باید حداقل ۱۰ کاراکتر باشد"
    })
    .refine((val) => !val || val.length <= 2000, {
      message: "توضیحات نمی‌تواند بیشتر از ۲۰۰۰ کاراکتر باشد"
    })
    .refine(
      (val) => !val || /^[\u0600-\u06FFa-zA-Z0-9\s\-_.،؛:!؟()\[\]{}@#$%^&*+=~<>\/\\|]+$/.test(val),
      { message: "توضیحات شامل کاراکترهای غیرمجاز است" }
    )
    .transform((val) => val?.trim() || undefined),

  assign: z
    .string()
    .min(1, { message: "انتساب به فرد الزامی است" })
    .min(2, { message: "نام فرد باید حداقل ۲ کاراکتر باشد" })
    .max(100, { message: "نام فرد نمی‌تواند بیشتر از ۱۰۰ کاراکتر باشد" })
    .regex(/^[\u0600-\u06FFa-zA-Z\s.]+$/, {
      message: "نام فرد باید فقط شامل حروف فارسی یا انگلیسی باشد"
    })
    .refine(
      (val) => val.trim().length >= 2,
      { message: "نام فرد باید حداقل ۲ کاراکتر معتبر داشته باشد" }
    ),

  status: taskStatusEnum
});

export type TaskFormTypeStrict = z.infer<typeof taskFormSchemaStrict>;