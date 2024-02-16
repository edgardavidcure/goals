import Button from "@/app/ui/button"
import Image from "next/image"
import heroImage from "../../../../public/hero.webp"
export default function HeroSection({ header, subHeader}: { header: string, subHeader: string}){
    return (
        <section >
            <div className="flex flex-col w-full items-center justify-center my-10 h-auto">
                <Image src={heroImage} alt="" width={400} height={600}/>
                <h1 className="m-2 text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">{header}</h1>
                <p>{subHeader}</p>
                <div className="flex flex-wrap gap-5 m-6">
                    <Button href="/account/signUp" text="Get Started" styles="bg-dark-blue text-white px-8 py-2 rounded-md hover:bg-opacity-50 active:bg-dark-blue focus:outline-none focus:ring focus:ring-opacity-50" />
                </div>
                
            </div>
        </section>
    )
}

