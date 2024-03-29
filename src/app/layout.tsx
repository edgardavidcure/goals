import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Nav from "./ui/home/nav";
import { getServerSession }  from 'next-auth';
import SessionProvider from "../app/session/SessionProvider"
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Goals",
  description: "Goals for youth",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession();
  return (
    <html lang="en">
      <body className={inter.className}>
      <SessionProvider session={session}>

        <div>{children}</div>

        </SessionProvider>
        </body>
    </html>
  );
}
