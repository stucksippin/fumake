import localFont from "next/font/local";
import "./globals.css";
import Header from "@/components/UI/Header";
import Footer from "@/components/UI/Footer";
import { Suspense } from "react";
import Loading from "./loading";
import AdminCheck from "@/components/CheckAdmin";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});


export const metadata = {
  title: "FUMAKE",
  description: "Магазин мебели",
};

export default function RootLayout({ children }) {

  return (
    <html lang="en">

      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <AdminCheck><Header /></AdminCheck>
        <Suspense fallback={<Loading />}>
          <main>{children}</main>
        </Suspense>
        <AdminCheck><Footer /></AdminCheck>

      </body>
    </html>
  );
}
