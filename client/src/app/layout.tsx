import { Fira_Code } from "next/font/google";

import MainLayout from "@/components/MainLayout";
import "./globals.css";

const fira_code = Fira_Code({
  subsets: ['latin'],
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`m-0 p-0 ${fira_code.className} antialiased`}>
      <head>
        <title>eYow</title>
      </head>
      <body
        className={`w-full h-screen antialiased overflow-hidden`}
      >
        <MainLayout>
          {children}
        </MainLayout>
      </body>
    </html>
  );
}
