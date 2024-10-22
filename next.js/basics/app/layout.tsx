import Sidebar from "@/components/Sidebar";
import "./globals.css";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "PF302",
  description: "PF302 class",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="flex ">
        <Sidebar />
        <div className="w-[calc(100%-256px)]">{children}</div>
      </body>
    </html>
  );
}
