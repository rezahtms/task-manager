import type { Metadata } from "next";
import { ToastContainer } from "react-toastify";
import { vazir } from "./fonts";
import "./globals.css";
import ReduxProvider from "./libs/stores/provider";

export const metadata: Metadata = {
  title: {
    default: "وایب | مدیریت وظایف تیمی",
    template: "%s | وایب",
  },
  description:
    "وایب یک ابزار مدیریت وظایف شبیه Jira برای برنامه‌ریزی، پیگیری و همکاری تیم‌هاست.",
  applicationName: "vibe",
  icons: {
    icon: [
      { url: "/images/favicon.svg", type: "image/svg+xml" },
      { url: "/images/favicon.ico", type: "image/x-icon" },
    ],
  },
  openGraph: {
    type: "website",
    locale: "fa_IR",
    siteName: "وایب",
    title: "وایب | مدیریت وظایف تیمی",
    description:
      "مدیریت پروژه، بردها، اسپرینت‌ها و تسک‌ها در یک پلتفرم حرفه‌ای.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fa" dir="rtl">
      <body className={`${vazir.variable}  antialiased`}>
        <ReduxProvider>{children}</ReduxProvider>
        <ToastContainer
          position="bottom-center"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop
          closeOnClick
          rtl
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
      </body>
    </html>
  );
}
