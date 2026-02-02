import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { vazir } from "./fonts";
import "./globals.css";
import ReduxProvider from "./libs/stores/provider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

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
      </body>
    </html>
  );
}
