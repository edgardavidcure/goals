import Image from "next/image"
import heroImage from "../../../../public/hero.webp"
import GetStartedBtn from "../getStartedBtn"
export default function HeroSection({ header, subHeader}: { header: string, subHeader: string}){
    return (
        <section className="mx-10">
            <div className="flex flex-col w-full items-center justify-center my-10 h-auto">
                <Image src={heroImage} alt="" width={400} height={600}/>
                <h1 className="m-2 text-3xl font-bold tracking-tighter md:text-5xl lg:text-6xl/none">{header}</h1>
                <p>{subHeader}</p>
                <div className="flex flex-wrap gap-5 m-6">
                    <GetStartedBtn/>
                </div>
                
            </div>
        </section>
    )
}

