import { Check, CheckCheck, CircleDashed, ScanSearch } from "lucide-react";
import { ColumnConfig, Task } from "../types/task";

export const COLUMNS: ColumnConfig[] = [
  {
    id: "todo",
    title: "در انتظار انجام",
    count: 3,
    icon: Check,
    status: "todo",
    filter: {
      type: "input",
      placeholder: "جستجو در وظایف...",
      focusColor: "sky-300",
    },
  },
  {
    id: "development",
    title: "در حال توسعه",
    count: 2,
    icon: CircleDashed,
    status: "in-development",
    filter: {
      type: "input",
      placeholder: "جستجو براساس توسعه دهنده...",
      focusColor: "amber-300",
    },
  },
  {
    id: "review",
    title: "در حال بررسی",
    count: 6,
    icon: ScanSearch,
    status: "validation",
    filter: {
      type: "input",
      placeholder: "فیلتر بر اساس بازبینی‌کننده...",
      focusColor: "violet-300",
    },
  },
  {
    id: "done",
    title: "انجام شده",
    count: 2,
    icon: CheckCheck,
    status: "done",
    filter: {
      type: "select",
      options: ["همه", "نسخه ۱.۰", "پایداری"],
      focusColor: "green-300",
    },
  },
];



export const TASKS: Task[] = [
  {
    id: "task-1",
    title: "طراحی صفحه ورود",
    description: "طرح اولیه صفحه ورود و اعتبارسنجی فرم",
    assignee: "سارا",
    status: "todo",
  },
  {
    id: "task-2",
    title: "پیاده‌سازی API احراز هویت",
    description: "مسئله‌های امنیتی و توکن‌ها",
    assignee: "لیلا",
    status: "in-development",
  },
  {
    id: "task-3",
    title: "مرور کد احراز هویت",
    description: "بررسی نکات امنیتی و تست‌های واحد",
    assignee: "امیر",
    status: "validation",
  },
  {
    id: "task-4",
    title: "راه‌اندازی CI",
    description: "پایپ‌لاین اولیه و بررسی اجرا",
    assignee: "سارا",
    status: "done",
  },
];


export const MEMBERS = [
  { id: 1, name: "علی" },
  { id: 2, name: "سارا" },
  { id: 3, name: "رضا" },
  { id: 4, name: "محمد" },
  { id: 5, name: "باران" },
  { id: 6, name: "دانیال" },
  { id: 7, name: "شیرین" },
  { id: 8, name: "کیان" }
];


export const STATUS = [{ status: "todo", value: 'در انتظار انجام' }, { status: "in-development", value: 'در حال توسعه' }, { status: "validation", value: 'در حال بررسی' }, { status: "done", value: 'انجام شده' }]