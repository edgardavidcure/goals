import Image from "next/image";
import Head from "next/head";
import clientPromise from "./lib/mongodb";
import dbConnect from "./lib/mongodb";
import HeroSection from "./ui/home/hero";
import heroImage from "../../public/hero.png"
import Section from "./ui/home/section";

export default async function Page() {
  const isConnected = await dbConnect()
  return (
    <main className="">
      <HeroSection header="Achieve Your Goals" subHeader="Create goals in different areas of your life to keep your life balanced."/>
      <Section/>
    </main>
  );
}
