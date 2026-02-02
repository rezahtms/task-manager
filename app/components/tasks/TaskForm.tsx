"use client";

import { MEMBERS, STATUS } from "@/app/libs/constants/tasks";
import { taskFormSchemaStrict } from "@/app/libs/validators/task-form.validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { Plus } from "lucide-react";
import { SubmitHandler, useForm } from "react-hook-form";
import { FormInputField } from "../ui/FormInputField";
import { FormSelectableField } from "../ui/FormSelectableField";
import { FormTextareaField } from "../ui/FormTextareaField";

export default function TaskForm() {
  const { control, handleSubmit, formState } = useForm({
    resolver: zodResolver(taskFormSchemaStrict),
    defaultValues: {
      title: "",
      description: undefined,
      assign: "",
      status: "todo",
    },
    mode: "onTouched",
  });
  type FormData = Parameters<typeof handleSubmit>[0] extends (
    data: infer T,
  ) => void
    ? T
    : never;
  const onSubmit: SubmitHandler<FormData> = (data) => {
    console.log(data);
  };
  return (
    <form
      className="min-w-90 w-full flex flex-col gap-2"
      onSubmit={handleSubmit(onSubmit)}
    >
      <FormInputField
        control={control}
        name="title"
        label="عنوان وظیفه "
        required
      />
      <FormSelectableField
        control={control}
        name="assign"
        label="اختصاص دادن
"
        options={MEMBERS}
        getOptionLabel={(opt) => opt.name}
        getOptionValue={(otp) => otp.name}
        required
      />
      <FormSelectableField
        control={control}
        name="status"
        label="وضعیت"
        options={STATUS}
        getOptionLabel={(otp) => otp.value}
        getOptionValue={(otp) => otp.status}
        required
      />
      <FormTextareaField control={control} name="description" label="توضیحات" />
      <button
        disabled={!formState.isDirty}
        type="submit"
        className="
    flex items-center justify-center
    gap-2
    px-4 py-3
    text-sm font-semibold
    text-white
    bg-blue-500
    rounded-xl
    shadow-md
    hover:bg-blue-700
    active:bg-blue-800
    focus:outline-none
    focus:ring-4
    focus:ring-blue-300
    transition-all
    duration-200
    disabled:bg-gray-400
    disabled:shadow-none
    disabled:cursor-not-allowed
  "
      >
        <Plus />
        افزودن به لیست
      </button>
    </form>
  );
}
