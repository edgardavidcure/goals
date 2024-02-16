import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Nav from "./ui/home/nav";
import { getServerSession }  from 'next-auth';
import SessionProvider from "../app/session/SessionProvider"
import Footer from "./ui/footer";
// import { authConfig } from "../../auth.config";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
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

        <Nav/>

        <div>{children}</div>

        <Footer/>
        </SessionProvider>
        </body>
    </html>
  );
}
