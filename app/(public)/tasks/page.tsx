import { Metadata } from "next";
import DnDBoard from "@/app/components/tasks/DnDBoard";

export const metadata: Metadata = {
  title: { absolute: "مدیریت وظایف" },
  description:
    "وایب یک ابزار مدیریت وظایف شبیه Jira برای برنامه‌ریزی، پیگیری و همکاری تیم‌هاست.",
};

export default function Home() {
  return <DnDBoard />;
}
